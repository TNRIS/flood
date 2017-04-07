import { createAction } from 'redux-actions'

import {
  CLEAR_CENTER_AND_ZOOM,
  CLEAR_POPUP,
  SET_CENTER_AND_ZOOM,
  SET_POPUP
} from '../constants/MapActionTypes'

/**
 * Emit action to reset the map's state to a null center and zoom
 * @return {object} action
 */
export function clearCenterAndZoom() {
  return {
    type: CLEAR_CENTER_AND_ZOOM
  }
}

export function clearPopup() {
  return {
    type: CLEAR_POPUP
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

export function setPopup(data) {
  return {
    type: SET_POPUP,
    payload: {
      id: data.id,
      data: data.data
    }
  }
}
