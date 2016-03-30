import objectAssign from 'object-assign'

import { HOVER_OVER_MAP_CLICKABLE_TYPE } from '../actions'

const initialState = {}

export default function featureLayers(state = initialState, action) {
  switch (action.type) {
    case HOVER_OVER_MAP_CLICKABLE_TYPE:
      return objectAssign({}, state, {
        hoveringOver: action.data
      })
    default:
      return state
  }
}


