import keys from '../keys'
import Layer from './Layer'

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class FloodAlertsLayer extends Layer {
  constructor(map) {
    super(map)
    this.refreshIntervalId = null
    // this.refreshTimeMs = 360000 //6 minutes
    this.refreshTimeMs = 3000 //6 minutes

    const url = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/alerts-flood/{z}/{x}/{y}/0.png`
    this.layer = L.tileLayer(url, {
      subdomains: '1234',
      opacity: 0.6,
      attribution: 'Aeris Weather'
    })
  }

  addTo(map) {
    this.layer.addTo(map)
    this.refreshIntervalId = setInterval(() => this.layer.redraw(), this.refreshTimeMs)
  }

  removeFrom(map) {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId)
      this.refreshIntervalId = null
    }

    if (map.hasLayer(this.layer)) {
      map.removeLayer(this.layer)
    }
  }
}
