import L from 'leaflet'
import Layer from './Layer'

export default class GeoJsonLayer extends Layer {
  constructor({id, map, handlers, externalUrl}) {
    super({id, map, handlers})
    this.externalUrl = externalUrl
    this.update();
  }

  update() {
    let that = this
    this.setStatus('updating')
    if(!that.park_map) {
      fetch(this.externalUrl).then((response) => response.text().then(function (result) {
        try {
          that.park_map = JSON.parse(result)
          that.park_map = L.geoJSON(that.park_map)
        } catch(err) {
          console.error(err.stack)
        }
      }))
    }
    this.setStatus('ready')
  }

  refresh() {
    update()
  }

  show() {
    let that = this;
    switch (this.id) {
      case "state-parks":
        if (this.status === 'ready') {
          that.park_map.addTo(that.map)
        }
        break
      default:
        null
    }
  }
  hide() {
    if(this.externalUrl && this.park_map && this.map.hasLayer(this.park_map)) {
      this.map.removeLayer(this.park_map)
    }
  }
}
