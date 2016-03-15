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
        cartodb.getLayer(options.name)
          .then((data) => {
            this.cache[id] = {
              tileLayer: L.tileLayer(data.tilesUrl),
              status: 'ready'
            }
            if (data.gridsUrl && options.utfGridEvents) {
              const utfGridLayer = L.utfGrid(data.gridsUrl, {
                useJsonP: false
              })

              R.toPairs(options.utfGridEvents).forEach(([eventType, handler]) => {
                utfGridLayer.on(eventType, handler)
              })

              this.cache[id].utfGridLayer = utfGridLayer
            }
          })
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
