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
            const tileLayer = L.tileLayer(data.tilesUrl)
            this.cache[id] = {
              tileLayer,
              status: 'ready'
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
