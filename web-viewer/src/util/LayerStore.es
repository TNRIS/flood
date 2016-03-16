import * as cartodb from './cartodb'
import * as aeris from './aeris'


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
      case 'aeris-radar':
        this.store[id] = new aeris.AnimatedWeatherLayer(options)
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
