import R from 'ramda'

import * as cartodb from './cartodb'

export default class LayerCache {
  constructor() {
    this.cache = {}
  }

  add(id, type, options) {
    if (this.cache[id]) {
      return
    }

    this.cache[id] = {
      status: 'pending'
    }

    switch (type) {
      case 'cartodb':
        this.cache[id] = new cartodb.CartoDBLayer(options)
        break
      default:
        null
    }
  }

  all() {
    return this.cache
  }

  get(id) {
    return this.cache[id]
  }
}
