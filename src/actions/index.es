import { createAction } from 'redux-actions'

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

export const setPopup = createAction(types.SET_POPUP, data => data)

export const setFeatureLayer = (id) => {
  return (dispatch) => {
    dispatch(setPopup())

    dispatch({
      type: types.SET_FEATURE_LAYER,
      id
    })
  }
}

export const setGaugeInit = (initState) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_GAUGE_INIT,
      initState
    })
  }
}

export const updateSigStage = (lid, stage) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_SIGSTAGE,
      lid,
      stage
    })
  }
}

export const showSubscribeDialog = () => {
  return (dispatch) => {
    dispatch({
      type: types.SHOW_SUBSCRIBE_DIALOG
    })
  }
}

export const hideSubscribeDialog = () => {
  return (dispatch) => {
    dispatch({
      type: types.HIDE_SUBSCRIBE_DIALOG
    })
  }
}

export const setLidAndName = (lid, name) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_LID_AND_NAME,
      lid,
      name
    })
  }
}
