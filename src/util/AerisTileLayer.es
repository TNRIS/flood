import L from 'leaflet'

import keys from '../keys'
import TileLayer from './TileLayer'

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class AerisTileLayer extends TileLayer {
  constructor({domain='tile{s}.aerisapi.com', code, ...options}) {
    super(options)

    this.layerUrl = `https://${domain}/${keys.aerisApiId}_${keys.aerisApiSecret}/${code}/{z}/{x}/{y}/0.png`
    this.initLayer({
      attribution: '<a href="http://www.aerisweather.com">AerisWeather</a>',
      ...options
    })
  }
}
