export const SET_BASE_LAYER_TYPE = 'SET_BASE_LAYER'
export const setBaseLayer = (id) => {
  return {
    type: SET_BASE_LAYER_TYPE,
    id
  }
}

export const SET_FEATURE_LAYER_TYPE = 'SET_FEATURE_LAYER'
export const setFeatureLayer = (id) => {
  return {
    type: SET_FEATURE_LAYER_TYPE,
    id
  }
}

export const LAYER_STATUS_CHANGE_TYPE = 'LAYER_STATUS_CHANGE'
export const layerStatusChange = (id, status) => {
  return {
    type: LAYER_STATUS_CHANGE_TYPE,
    id,
    status
  }
}

export const HOVER_OVER_MAP_CLICKABLE_TYPE = 'HOVER_OVER_MAP_CLICKABLE'
export const hoverOverMapClickable = (data) => {
  return {
    type: HOVER_OVER_MAP_CLICKABLE_TYPE,
    data,
  }
}
