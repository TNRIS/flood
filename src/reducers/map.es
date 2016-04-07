import objectAssign from 'object-assign'

import * as actions from '../actions'

const initialState = {}

export default function map(state = initialState, action) {
  switch (action.type) {
    case actions.OPEN_POPUP_ACTION:
      return objectAssign({}, state, {
        popup: action.data
      })
    case actions.CLOSE_POPUP_ACTION:
      return objectAssign({}, state, {
        popup: action.data
      })
    case actions.HOVER_OVER_MAP_CLICKABLE_ACTION:
      return objectAssign({}, state, {
        hoveringOver: action.data
      })
    default:
      return state
  }
}
