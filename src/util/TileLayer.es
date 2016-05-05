import L from 'leaflet'

import keys from '../keys'
import Layer from './Layer'

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class TileLayer extends Layer {
  constructor(options) {
    super(options)
    this.refreshIntervalId = null
    this.refreshTimeMs = 3600000 // 1 hour
    this.layerUrl
  }

  initLayer() {
    if (this.layerUrl) {
      this.layer = L.tileLayer(this.layerUrl, {
        subdomains: '1234',
        opacity: 0.6,
        attribution: 'Aeris Weather'
      })

      this.setStatus('ready')
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
