import L from 'leaflet'

import keys from '../keys'
import Layer from './Layer'

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

  show() {
    this.layer.addTo(this.map)
    this.refreshIntervalId = setInterval(() => this.layer.redraw(), this.refreshTimeMs)
  }

  hide() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId)
      this.refreshIntervalId = null
    }

    if (this.map.hasLayer(this.layer)) {
      this.map.removeLayer(this.layer)
    }
  }
}
