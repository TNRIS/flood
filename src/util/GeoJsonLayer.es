import L from 'leaflet'
import Layer from './Layer'

export default class GeoJsonLayer extends Layer {
  constructor({id, map, handlers, externalUrl, refreshTimeMs = 7200000}) {
    super({id, map, handlers})
    this.externalUrl = externalUrl
    this.update();
    this.refreshIntervalId = setInterval(() => this.refresh(), refreshTimeMs)
  }

  update() {
    let that = this
    this.setStatus('updating')
    if(!that.json_map) {
      fetch(this.externalUrl).then((response) => response.text().then(function (result) {
        try {
          that.json_map = JSON.parse(result)
          that.json_map = L.geoJSON(that.json_map)
        } catch(err) {
          console.error(err.stack)
        }
      }))
    }
    this.setStatus('ready')
  }

  refresh() {
    this.update()
  }

  show() {
    let that = this;
    switch (this.id) {
      case "state-parks":
        if (this.status === 'ready') {
          that.json_map.addTo(that.map)
        }
        break
      default:
        null
    }
  }
  hide() {
    if(this.externalUrl && this.json_map && this.map.hasLayer(this.json_map)) {
      this.map.removeLayer(this.json_map)
    }
  }
}
