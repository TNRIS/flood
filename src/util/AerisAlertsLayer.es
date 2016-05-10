import axios from 'axios'
import L from 'leaflet'

import keys from '../keys'
import AerisTileLayer from './AerisTileLayer'


function getAdvisoryInfo({latitude, longitude}) {

  return axios.get(`https://${account}.cartodb.com/api/v1/map/`, mapConfig)
    .then(({data}) => {
      const layerid = data.layergroupid
      const urls = {
        tilesUrl: `https://${account}.cartodb.com/api/v1/map/${layerid}/{z}/{x}/{y}.png`
      }
      if (options.interactivity) {
        urls.gridsUrl = `https://${account}.cartodb.com/api/v1/map/${layerid}/0/{z}/{x}/{y}.grid.json`
      }
      return urls
    })


}

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class AerisAlertsLayer extends AerisTileLayer {
  constructor(options) {
    super({domain: 'maps.aerisapi.com', ...options})

    this.map.on('click', (event) => {
      if(this.map.hasLayer(this.layer)) {
        const data = {
          latlng: event.latlng,
        }
        this.handlers.onClickAlerts(this.id, event)
      }
    })
  }
}
