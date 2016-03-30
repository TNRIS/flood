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

export const LAYER_STATUS_CHANGE_ACTION = 'LAYER_STATUS_CHANGE'
export const layerStatusChange = (id, status) => {
  return {
    type: LAYER_STATUS_CHANGE_ACTION,
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
