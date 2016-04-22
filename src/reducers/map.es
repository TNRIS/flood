import objectAssign from 'object-assign'
import R from 'ramda'

import * as types from '../actions/types'

const initialState = {}

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
    case types.HOVER_OVER_MAP_CLICKABLE:
      return objectAssign({}, state, {
        hoveringOver: action.data
      })
    default:
      return state
  }
}
