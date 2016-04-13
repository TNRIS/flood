import objectAssign from 'object-assign'
import R from 'ramda'

import * as types from '../actions/types'

const initialState = {}

export default function map(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_POPUP:
      return objectAssign({}, state, {
        popup: action.data
      })
    case types.CLOSE_POPUP:
      return objectAssign({}, R.omit(['popup'], state))
    case types.HOVER_OVER_MAP_CLICKABLE:
      return objectAssign({}, state, {
        hoveringOver: action.data
      })
    default:
      return state
  }
}
