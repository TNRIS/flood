import axios from 'axios'
import * as R from 'ramda'
import { setGageInit } from './MapActions'

//function only run once on the initial app build. populationed the subscribeDialog reducer
//with the current stage of all flood gauges
export function retrieveGageStatus() {
  return (dispatch) => {
    const query = `https://mapserver.tnris.org/?map=/tnris_mapfiles/nws_ahps_gauges_texas.map&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=CurrentStage&outputformat=geojson&SRSNAME=EPSG:4326`
    return axios.get(query)
      .then(({data}) => {
        const formatState = data.features.map((gage) => {
          const obj = {}
          obj[gage.properties.lid] = {
            "name": gage.properties.name,
            "stage": gage.properties.stage,
            "sigstage": gage.properties.sigstage,
            "wfo": gage.properties.wfo,
            "latitude": gage.properties.latitude,
            "longitude": gage.properties.longitude,
            "timestamp": gage.properties.timestamp
          }
          return obj
        })
        const initState = R.mergeAll(formatState)
        dispatch(setGageInit(initState))
      })
  }
}
