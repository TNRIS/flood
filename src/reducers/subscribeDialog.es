import objectAssign from 'object-assign'
import R from 'ramda'

import * as types from '../actions/types'

const initialState = false

export default function map(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SUBSCRIBE_DIALOG:
        return true    
    default:
      return state
  }
}
