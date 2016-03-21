import * as cartodb from './cartodb'
import AnimatedWeatherLayer from './AnimatedWeatherLayer'
import FloodAlertsLayer from './FloodAlertsLayer'


export default class LayerStore {
  constructor() {
    this.store = {}
  }

  add(id, type, options) {
    if (this.store[id]) {
      return
    }

    this.store[id] = {
      status: 'pending'
    }

    switch (type) {
      case 'cartodb':
        this.store[id] = new cartodb.CartoDBLayer(options)
        break
      case 'animated-weather':
        this.store[id] = new AnimatedWeatherLayer(options)
        break
      case 'flood-alerts':
        this.store[id] = new FloodAlertsLayer(options)
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
