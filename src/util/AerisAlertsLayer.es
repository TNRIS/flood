import L from 'leaflet'

import keys from '../keys'
import AerisTileLayer from './AerisTileLayer'


//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class AerisAlertsLayer extends AerisTileLayer {
  constructor(options) {
    super({domain: 'maps.aerisapi.com', ...options})
  }
}
