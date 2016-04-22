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

export const setFeatureLayer = (id) => {
  return (dispatch) => {
    dispatch(setPopup())

    dispatch({
      type: types.SET_FEATURE_LAYER,
      id
    })
  }
}

export const setPopup = createAction(types.SET_POPUP, data => data)
