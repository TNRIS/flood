import R from 'ramda'

import { getLayer } from './cartodb'

export default class LayerCache {
  constructor() {
    this.cache = {}
  }

  add(id, layerInfo) {
    if (this.cache[id]) {
      return
    }

    this.cache[id] = {
      status: 'pending'
    }

    switch (layerInfo.type) {
      case 'cartodb':
        getLayer(layerInfo.name)
          .then((data) => {
            this.cache[id] = {
              tileLayer: L.tileLayer(data.tilesUrl),
              status: 'ready'
            }
            if (data.gridsUrl && layerInfo.utfGridEvents) {
              const utfGridLayer = L.utfGrid(data.gridsUrl, {
                useJsonP: false
              })

              R.toPairs(layerInfo.utfGridEvents).forEach(([eventType, handler]) => {
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
