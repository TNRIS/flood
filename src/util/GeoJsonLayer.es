import L from 'leaflet'
import Layer from './Layer'
import { store } from "../store"
import { mapClickHandler } from '../actions/MapActions'
import defaultMarkerIcon from '../images/foundation-icon-fonts_2015-02-16_marker_42_0_333333_none.png'

const customMarker = new L.icon({
  iconUrl: defaultMarkerIcon,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});
var util = require('util')


export default class GeoJsonLayer extends Layer {
  constructor({id, map, handlers, externalUrls, refreshTimeMs = 7200000, rawJSON}) {
    super({id, map, handlers})
    this.externalUrls = externalUrls
    this.rawJSON = rawJSON
    this.update();
    this.refreshIntervalId = setInterval(() => this.refresh(), refreshTimeMs)
  }

  update(json) {
    if(json && json.type && json.type.length) 
    {
      // If JSON with a type is provided update using that value.
      this.setStatus('updating')
      this.json_map = L.geoJSON(json)
      this.setStatus('ready')
    }  else {
        // If no externalUrl then there is nothing to update.
        if(!this.externalUrls) {
          return
        }
    
        let that = this
        this.setStatus('updating')
        if(!that.json_map) {
          that.json_map = []
          this.externalUrls.forEach(externalUrl => {
            fetch(externalUrl.url).then((response) => response.text().then(function (result) {
              try {
                
                let jm = JSON.parse(result)
                jm = L.geoJSON(jm)
  
                jm.eachLayer(function (layer) {  
                  layer.setStyle({
                    fillColor :externalUrl.bgColor,
                    color: externalUrl.bgColor
                  })
                  layer.on('click', (event) => {
                    if(event.target.feature.properties.ParkName) {
                      event.data = {
                        "parkName":event.target.feature.properties.ParkName,
                        "title": "State Parks"
                      }
                    } else if(event.target.feature.properties.LoName) {
                      event.data = {
                        "parkName":event.target.feature.properties.LoName,
                        "title": "Wildife Management Areas"
                      }
                    }
                    
                    store.dispatch(mapClickHandler('state-parks', event, event.latlng, event))
                  })
                })

                that.json_map.push(jm)
              } catch(err) {
                console.error(err.stack)
              }
            }))
          })
        }
        this.setStatus('ready')
    }
  }

  refresh() {
    this.update()
  }

  show() {
    switch (this.id) {
      case "state-parks":
        if (this.status === 'ready') {
          this.json_map.forEach(jm => {
            jm.addTo(this.map)
          })
        }
        break
      case "custom-overlay":
          this.setStatus('updating')
          let currentStore = store.getState()
          if(!this.shown) {
            this.shown = true
            this.json_map = L.geoJSON(JSON.parse(currentStore.customLayer.customGeoJson), {
              fillColor :'gray',
              color: 'gray',
              pointToLayer: (feature, latlng) => {
                return L.marker(latlng, {icon: customMarker})
              }
            })
            this.json_map.eachLayer(function (layer) {  
              layer.on('click', (event) => {
                event.data = {"customData":event.target.feature.properties}
                store.dispatch(mapClickHandler('custom-overlay', event, event.latlng, event))
              })
            });
          }
          this.json_map.addTo(this.map)
          this.setStatus('ready')
        break
      default:
        null
    }
  }
  hide() {
    if(this.json_map && this.hasLayers(this.json_map)) {
      let that = this
      this.shown = false
      if(this.json_map.length && this.json_map.length > 1) {
        this.json_map.forEach(jm => {
          that.map.removeLayer(jm)
        })
      } else {
        that.map.removeLayer(this.json_map)
      }
    }
  }

  /* Check if a layer is on this map */
  hasLayers(json_maps) {
    let has_layers = true

    if(this.json_map) {
      if(json_maps.length && json_maps.length > 1) {
        json_maps.forEach(jm => {
          if(!this.map.hasLayer(jm)) {
            has_layers = false
          }
        })
      } else {
        if(!this.map.hasLayer(json_maps)) {
          has_layers = false
        } 
      }
    } else {
      has_layers = false
    }

    return has_layers
  }
}
