import objectAssign from 'object-assign'
import * as types from '../actions/types'

const initialState = false

export default function subscribeDialog(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SUBSCRIBE_DIALOG:
      return true
    default:
      return state
  }
}
