import axios from 'axios'
import R from 'ramda'

import * as types from './types'

export const layerStatusChange = (id, status) => {
  return {
    type: types.CHANGE_LAYER_STATUS,
    id,
    status
  }
}

export const hoverOverMapClickable = (data) => {
  return {
    type: types.HOVER_OVER_MAP_CLICKABLE,
    data,
  }
}

export const setBaseLayer = (id) => {
  return {
    type: types.SET_BASE_LAYER,
    id
  }
}

export const setFeatureLayer = (id) => {
  return {
    type: types.SET_FEATURE_LAYER,
    id
  }
}

export const setGageInit = (initState) => {
  return {
    type: types.SET_GAGE_INIT,
    initState
  }
}

//function only run once on the initial app build. populationed the subscribeDialog reducer
//with the current stage of all flood gauges
export function retrieveGageStatus() {
  return (dispatch) => {
    const query = `SELECT lid, name, stage, sigstage, wfo, latitude, longitude, timestamp FROM nws_ahps_gauges_texas_develop`
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

export const updateTimestamp = (timestamp) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TIMESTAMP,
      timestamp
    })
  }
}

export const showAboutDialog = () => {
  return (dispatch) => {
    dispatch({
      type: types.SHOW_ABOUT_DIALOG
    })
  }
}

export const hideAboutDialog = () => {
  return (dispatch) => {
    dispatch({
      type: types.HIDE_ABOUT_DIALOG
    })
  }
}
