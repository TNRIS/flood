import AnimatedWeatherLayer from './AnimatedWeatherLayer'
import CartoDBLayer from './CartoDBLayer'
import FloodAlertsLayer from './FloodAlertsLayer'


export default class LayerStore {
  constructor(map) {
    this.store = {}
    this.map = map
  }

  add(id, type, options) {
    if (this.store[id]) {
      return
    }

    this.store[id] = {
      status: 'pending'
    }

    switch (type) {
      case 'animated-weather':
        this.store[id] = new AnimatedWeatherLayer(this.map, options)
        break
      case 'cartodb':
        this.store[id] = new CartoDBLayer(this.map, options)
        break
      case 'flood-alerts':
        this.store[id] = new FloodAlertsLayer(this.map, options)
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
