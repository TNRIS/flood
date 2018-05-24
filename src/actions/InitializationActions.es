import axios from 'axios'
import * as R from 'ramda'
import { setGageInit } from './MapActions'

//function only run once on the initial app build. populationed the subscribeDialog reducer
//with the current stage of all flood gauges
export function retrieveGageStatus() {
  return (dispatch) => {
    const query = `SELECT lid, name, stage, sigstage, wfo, latitude, longitude, timestamp FROM nws_ahps_gauges_texas`
    return axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
      .then(({data}) => {
        const formatState = data.rows.map((gage) => {
          const obj = {}
          obj[gage.lid] = {
            "name": gage.name,
            "stage": gage.stage,
            "sigstage": gage.sigstage,
            "wfo": gage.wfo,
            "latitude": gage.latitude,
            "longitude": gage.longitude,
            "timestamp": gage.timestamp
          }
          return obj
        })
        const initState = R.mergeAll(formatState)
        dispatch(setGageInit(initState))
      })
  }
}
