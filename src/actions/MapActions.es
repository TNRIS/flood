import {
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM,
  CHANGE_LAYER_STATUS,
  SET_BASE_LAYER,
  SET_FEATURE_LAYER,
  SET_POPUP,
  SET_GAGE_INIT,
  UPDATE_TIMESTAMP
} from '../constants/MapActionTypes'

import {
  setPopup
} from './PopupActions'


let prevClickEvent = null

/**
 * Emit action to reset the map's state to a null center and zoom
 * @return {object} action
 */
export function clearCenterAndZoom() {
  return {
    type: CLEAR_CENTER_AND_ZOOM
  }
}

export function mapClickHandler(id, data, clickLocation, event) {
  return (dispatch) => {
    if (data.data) {
      if ((!prevClickEvent || prevClickEvent.timeStamp !== event.originalEvent.timeStamp) && data.data) {
        dispatch(setPopup({id, data: data.data, clickLocation}))
      }
      prevClickEvent = event.originalEvent
    }
  }
}

/**
 * Emit action to change the center and zoom in the map
 * @param  {number} lat  latitude of new center point
 * @param  {number} lng  longitude of new center point
 * @param  {number} zoom map zoom level
 * @return {object} action
 */
export function setCenterAndZoom(lat, lng, zoom) {
  return {
    type: SET_CENTER_AND_ZOOM,
    lat,
    lng,
    zoom
  }
}

export const layerStatusChange = (id, status) => {
  return {
    type: CHANGE_LAYER_STATUS,
    id,
    status
  }
}

export const setBaseLayer = (id) => {
  return {
    type: SET_BASE_LAYER,
    id
  }
}

export const setFeatureLayer = (id) => {
  return {
    type: SET_FEATURE_LAYER,
    id
  }
}

export const setGageInit = (initState) => {
  return {
    type: SET_GAGE_INIT,
    initState
  }
}

export const updateTimestamp = (timestamp) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TIMESTAMP,
      timestamp
    })
  }
}
