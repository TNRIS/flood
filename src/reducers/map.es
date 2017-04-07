import objectAssign from 'object-assign'

import {
  CLEAR_CENTER_AND_ZOOM,
  CLEAR_POPUP,
  SET_CENTER_AND_ZOOM,
  SET_POPUP
 } from '../constants/MapActionTypes'

const initialState = {
  mapCenterLat: null,
  mapCenterLng: null,
  popup: null,
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
    case CLEAR_POPUP:
      return {...state, popup: null}
    case SET_CENTER_AND_ZOOM:
      return objectAssign({}, state, {
        mapCenterLat: action.lat,
        mapCenterLng: action.lng,
        zoomLevel: action.zoom
      })
    case SET_POPUP:
      console.log(action.payload)
      if (action.payload) {
        console.log(action.payload)
        return objectAssign({}, state, {
          popup: action.payload
        })
      }
      return {popup: null, ...state}
    default:
      return state
  }
}
