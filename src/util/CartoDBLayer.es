import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import L from 'leaflet'
import objectAssign from 'object-assign'
import { store } from '../store'
import { retrieveGageStatus } from '../actions/InitializationActions'
import { mapClickHandler } from '../actions/MapActions'
import Layer from './Layer'

function getLayer(options) {
  const account = options.account
  const mapConfig = {
    version: "1.0.1",
    layers: [{
      type: 'mapnik',
      options: objectAssign(
        {
          sql: condenseWhitespace(options.sql),
          cartocss_version: "2.3.0",
        },
        options
      )
    }]
  }

  return axios.post(`https://${account}.cartodb.com/api/v1/map/`, mapConfig)
    .then(({data}) => {
      const layerid = data.layergroupid
      const urls = {
        tilesUrl: `https://${account}.cartodb.com/api/v1/map/${layerid}/{z}/{x}/{y}.png`
      }
      if (options.interactivity) {
        urls.gridsUrl = `https://${account}.cartodb.com/api/v1/map/${layerid}/0/{z}/{x}/{y}.grid.json`
      }
      return urls
    })
}

export default class CartoDBLayer extends Layer {
  constructor({account, id, map, handlers, sql, interactivity, cartocss, attribution, refreshTimeMs = 7200000}) {
    super({id, map, handlers})

    this.account = account
    this.cartocss = cartocss
    this.interactivity = interactivity
    this.sql = sql
    this.attribution = attribution
    this.utfGridLayer

    this.refreshTimeMs = refreshTimeMs
    this.update()
    this.refreshIntervalId = setInterval(() => this.refresh(), this.refreshTimeMs)
  }

  update() {
    this.setStatus('updating')
    store.dispatch(retrieveGageStatus())

    return getLayer({account: this.account, cartocss: this.cartocss, interactivity: this.interactivity, sql: this.sql})
      .then((data) => {
        let previousTileLayer
        let previousUtfGridLayer

        const currentlyVisible = (this.tileLayer && this.map.hasLayer(this.tileLayer))
        if (currentlyVisible) {
          previousTileLayer = this.tileLayer
          previousUtfGridLayer = this.utfGridLayer
        }

        this.tileLayer = L.tileLayer(data.tilesUrl, {attribution: this.attribution})

        if (data.gridsUrl) {
          const utfGridLayer = L.utfGrid(data.gridsUrl, {
            useJsonP: false
          })

          utfGridLayer.on('click', (event) => {
            store.dispatch(mapClickHandler(this.id, event, event.latlng, event))
          })

          this.utfGridLayer = utfGridLayer
        }

        if (currentlyVisible && previousTileLayer) {
          this.map.removeLayer(previousTileLayer)
          this.map.addLayer(this.tileLayer)

          //  This will set the visible layer order relative to
          //  the order set in TileLayer.es and AnimatedWeatherLayer.es
          switch (this.id) {
            case "ahps-flood":
              this.tileLayer.setZIndex(99)
              break
            case "reservoir-conditions":
              this.tileLayer.setZIndex(98)
              break
            default:
              null
          }

          if (previousUtfGridLayer) {
            this.map.removeLayer(previousUtfGridLayer)
            this.map.addLayer(this.utfGridLayer)
          }
        }

        this.setStatus('ready')
      })
  }

  refresh() {
    this.update()
  }

  show() {
    if (this.status === 'ready') {
      if (this.tileLayer && !this.map.hasLayer(this.tileLayer)) {
        this.map.addLayer(this.tileLayer)

        // This will set the visible layer order relative to the order set in TileLayer.es
        switch (this.id) {
          case "ahps-flood":
            this.tileLayer.setZIndex(99)
            break
          case "reservoir-conditions":
            this.tileLayer.setZIndex(98)
            break
          default:
            null
        }
      }
      if (this.utfGridLayer && !this.map.hasLayer(this.utfGridLayer)) {
        this.map.addLayer(this.utfGridLayer)
      }
    }
  }

  hide() {
    const popupData = store.getState().popupData
    if (popupData.id) {
      if (popupData.id === this.id) {
        this.map.closePopup()
      }
    }

    if (this.tileLayer && this.map.hasLayer(this.tileLayer)) {
      this.map.removeLayer(this.tileLayer)
    }
    if (this.utfGridLayer && this.map.hasLayer(this.utfGridLayer)) {
      this.map.removeLayer(this.utfGridLayer)
    }
  }
}
