import objectAssign from 'object-assign'

import AerisTileLayer from './AerisTileLayer'
import AnimatedWeatherLayer from './AnimatedWeatherLayer'
import CartoDBLayer from './CartoDBLayer'
import FloodAlertsLayer from './FloodAlertsLayer'


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
      case 'animated-weather':
        this.store[id] = new AnimatedWeatherLayer(layerOptions)
        break
      case 'cartodb':
        this.store[id] = new CartoDBLayer(layerOptions)
        break
      case 'flood-alerts':
        this.store[id] = new FloodAlertsLayer(layerOptions)
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
