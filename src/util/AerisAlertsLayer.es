import axios from 'axios'
import * as R from 'ramda'

import keys from '../keys'
import AerisTileLayer from './AerisTileLayer'

import { store } from '../store'
import { mapClickHandler } from '../actions/MapActions'


function getAdvisoryInfo({latitude, longitude}) {
  const queryURL = `https://api.aerisapi.com/alerts/${latitude},${longitude}?limit=100&query=active:1&sort=sigp&client_id=xxx&client_secret=yyy`
  const queryParams = {
    client_id: keys.aerisApiId,
    client_secret: keys.aerisApiSecret,
    limit: 100,
    query: "active:1",
    sort: 'sigp',
  }

  return axios.get(queryURL, { params: queryParams })
    .then(({ data }) => {
      const uniqueResponses = R.uniqBy((response) => {
        return R.pick(['name', 'body'], response.details)
      }, data.response)
      data.response = uniqueResponses
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
            store.dispatch(mapClickHandler(this.id, alertData, latlng, event))
          })
      }
    })
  }
}
