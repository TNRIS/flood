import objectAssign from 'object-assign'

import AerisAlertsLayer from './AerisAlertsLayer'
import AerisTileLayer from './AerisTileLayer'
import AnimatedWeatherLayer from './AnimatedWeatherLayer'
import MapserverLayer from './MapserverLayer'


export default class LayerStore {
  constructor({ map, handlers }) {
    this.store = {}
    this.map = map
    this.handlers = handlers
  }

  add(id, type, options) {
    if (this.store[id]) {
      return
    }

    const layerOptions = objectAssign({}, {id, handlers: this.handlers, map: this.map}, options)

    switch (type) {
      case 'aeris-tile':
        this.store[id] = new AerisTileLayer(layerOptions)
        break
      case 'aeris-alerts':
        this.store[id] = new AerisAlertsLayer(layerOptions)
        break
      case 'animated-weather':
        this.store[id] = new AnimatedWeatherLayer(layerOptions)
        break
      case 'mapserver':
        this.store[id] = new MapserverLayer(layerOptions)
        break
      default:
        null
    }
  }

  all() {
    return this.store
  }

  get(id) {
    return this.store[id]
  }
}
