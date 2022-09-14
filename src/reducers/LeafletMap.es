import objectAssign from 'object-assign'

import {
    STORE_MAP
 } from '../constants/MapActionTypes'

const initialState = {
    mapObject: null
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case STORE_MAP:
      return objectAssign({}, state, {
        mapObject: action.map
      })
    default:
      return state
  }
}
