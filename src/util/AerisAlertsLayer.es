import axios from 'axios'
import L from 'leaflet'

import keys from '../keys'
import AerisTileLayer from './AerisTileLayer'


function getAdvisoryInfo({latitude, longitude}) {
  const queryURL = `https://api.aerisapi.com/advisories/closest`
  const queryParams = {
    client_id: keys.aerisApiId,
    client_secret: keys.aerisApiSecret,
    p: `${latitude},${longitude}`,
    radius: '25mi',
    filter: 'flood',
    query: 'sigp:1:3:5:9:7:11',
    active: '1',
  }

  return axios.get(queryURL, { params: queryParams })
    .then(({ data }) => {
      return data
    })
}

//TODO: advisory map layers requires an Aeris subscription - they are not available under the development plan
export default class AerisAlertsLayer extends AerisTileLayer {
  constructor(options) {
    super({domain: 'maps.aerisapi.com', ...options})

    this.map.on('click', (event) => {
      if (this.map.hasLayer(this.layer)) {
        const latlng = event.latlng

        getAdvisoryInfo({latitude: latlng.lat, longitude: latlng.lng})
          .then((advisoryData) => {
            let alertData = {}
            if (advisoryData.response.length) {
              alertData = {
                data: advisoryData,
                latlng: latlng,
              }
            }
            this.handlers.onClickAlerts(this.id, alertData)
          })
      }
    })
  }
}
