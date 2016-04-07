export const CHANGE_LAYER_STATUS_ACTION = 'CHANGE_LAYER_STATUS'
export const layerStatusChange = (id, status) => {
  return {
    type: CHANGE_LAYER_STATUS_ACTION,
    id,
    status
  }
}

export const HOVER_OVER_MAP_CLICKABLE_ACTION = 'HOVER_OVER_MAP_CLICKABLE'
export const hoverOverMapClickable = (data) => {
  return {
    type: HOVER_OVER_MAP_CLICKABLE_ACTION,
    data,
  }
}

export const CLOSE_POPUP_ACTION = 'CLOSE_POPUP'
export const closePopup = (data) => {
  return {
    type: CLOSE_POPUP_ACTION,
    data,
  }
}

export const OPEN_POPUP_ACTION = 'OPEN_POPUP'
export const openPopup = (data) => {
  return {
    type: OPEN_POPUP_ACTION,
    data,
  }
}

export const SET_BASE_LAYER_ACTION = 'SET_BASE_LAYER'
export const setBaseLayer = (id) => {
  return {
    type: SET_BASE_LAYER_ACTION,
    id
  }
}

export const SET_FEATURE_LAYER_ACTION = 'SET_FEATURE_LAYER'
export const setFeatureLayer = (id) => {
  return {
    type: SET_FEATURE_LAYER_ACTION,
    id
  }
}
