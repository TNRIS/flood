import objectAssign from 'object-assign'

import {
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM
 } from '../constants/MapActionTypes'

const initialState = {
  mapCenterLat: null,
  mapCenterLng: null,
  zoomLevel: null
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CENTER_AND_ZOOM:
      return objectAssign({}, state, {
        mapCenterLat: null,
        mapCenterLng: null,
        zoomLevel: null
      })
    case SET_CENTER_AND_ZOOM:
      return objectAssign({}, state, {
        mapCenterLat: action.lat,
        mapCenterLng: action.lng,
        zoomLevel: action.zoom
      })
    default:
      return state
  }
}
