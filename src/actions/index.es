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

export const closePopup = (data) => {
  return {
    type: types.CLOSE_POPUP,
    data,
  }
}

export const openPopup = (data) => {
  return {
    type: types.OPEN_POPUP,
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
