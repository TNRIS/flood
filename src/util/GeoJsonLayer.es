import L from 'leaflet'
import Layer from './Layer'
import { store } from "../store"
import { mapClickHandler } from '../actions/MapActions'
var util = require('util')


export default class GeoJsonLayer extends Layer {
  constructor({id, map, handlers, externalUrl, refreshTimeMs = 7200000, rawJSON}) {
    super({id, map, handlers})
    this.externalUrl = externalUrl
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
        if(!this.externalUrl) {
          return
        }
    
        let that = this
        this.setStatus('updating')
        if(!that.json_map) {
          fetch(this.externalUrl).then((response) => response.text().then(function (result) {
            try {
              that.json_map = JSON.parse(result)
              that.json_map = L.geoJSON(that.json_map)

              that.json_map.eachLayer(function (layer) {  
                layer.setStyle({
                  fillColor :'green',
                  color: 'green'
                })
                layer.on('click', (event) => {
                  event.data = {"parkName":event.target.feature.properties.ParkName}
                  store.dispatch(mapClickHandler('state-parks', event, event.latlng, event))
                })
              });
            } catch(err) {
              console.error(err.stack)
            }
          }))
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
          this.json_map.addTo(this.map)
        }
        break
      case "custom-overlay":
          this.setStatus('updating')
          let currentStore = store.getState()
          if(!this.shown) {
            this.shown = true
            this.json_map = L.geoJSON(JSON.parse(currentStore.customLayer.customGeoJson))
            this.json_map.eachLayer(function (layer) {  
              layer.setStyle({
                fillColor :'gray',
                color: 'gray'
              })

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
    if(this.json_map && this.map.hasLayer(this.json_map)) {
      this.shown = false
      this.map.removeLayer(this.json_map)
    }
  }
}
