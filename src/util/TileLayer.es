import L from 'leaflet'

import keys from '../keys'
import Layer from './Layer'

import { store } from '../store'

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class TileLayer extends Layer {
  constructor({ refreshTimeMs, layerUrl, ...options }) {
    super(options)
    this.refreshIntervalId = null
    this.refreshTimeMs = refreshTimeMs ? refreshTimeMs : 3600000 // default to 1 hour
    this.layerUrl = layerUrl
    this.initLayer()
  }

  initLayer(options) {
    if (this.layerUrl) {
      this.layer = L.tileLayer(this.layerUrl, {
        subdomains: '1234',
        ...options
      })

      this.setStatus('ready')
    } else {
      this.setStatus('not ready')
    }
  }

  refresh() {
    this.layer.redraw()

    //  This will set the visible layer order relative to
    //  the order set in MapserverLayer.es and AnimatedWeatherLayer.es
    this.layer.setZIndex(97)
  }

  show() {
    this.layer.addTo(this.map)

    //  This will set the visible layer order relative to
    //  the order set in MapserverLayer.es and AnimatedWeatherLayer.es
    this.layer.setZIndex(97)
    if (this.refreshIntervalId !== null) {
      clearInterval(this.refreshIntervalId)
    }
    this.refreshIntervalId = setInterval(() => this.refresh(), this.refreshTimeMs)
  }

  hide() {
    const popupData = store.getState().popupData
    if (this.id && popupData.id && this.id === popupData.id) {
      this.map.closePopup()
    }

    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId)
      this.refreshIntervalId = null
    }

    if (this.map.hasLayer(this.layer)) {
      this.map.removeLayer(this.layer)
    }
  }
}
