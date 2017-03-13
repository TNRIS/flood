import objectAssign from 'object-assign'
import R from 'ramda'

import * as types from '../actions/types'

import {
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM
} from '../constants/SubscriptionChangeActionTypes'

const initialState = {
  mapCenterLat: null,
  mapCenterLng: null,
  zoomLevel: null
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case types.SET_POPUP:
      if (action.payload) {
        return objectAssign({}, state, {
          popup: action.payload
        })
      }
      else {
        return objectAssign({}, R.omit(['popup'], state))
      }
      break
    case types.HOVER_OVER_MAP_CLICKABLE:
      return objectAssign({}, state, {
        hoveringOver: action.data
      })
    case SET_CENTER_AND_ZOOM:
      return objectAssign({}, state, {
        mapCenterLat: action.lat,
        mapCenterLng: action.lng,
        zoomLevel: action.zoom
      })
    case CLEAR_CENTER_AND_ZOOM:
      return objectAssign({}, state, {
        mapCenterLat: null,
        mapCenterLng: null,
        zoomLevel: null
      })
    default:
      return state
  }
}
