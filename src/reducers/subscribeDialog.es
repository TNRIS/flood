import objectAssign from 'object-assign'

import * as types from '../actions/types'

const initialState = {
  openDialog: false,
  lid: '',
  name: ''
}
//reducer for handling the subscription form. manages showing/hiding
//the dialog and the gauge identifiers for subscribing to a gauge
export default function subscribeDialog(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SUBSCRIBE_DIALOG:
      return objectAssign({}, state, {
        openDialog: true
      })
    case types.HIDE_SUBSCRIBE_DIALOG:
      return objectAssign({}, state, {
        openDialog: false
      })
    case types.SET_LID_AND_NAME:
      return objectAssign({}, state, {
        lid: action.lid,
        name: action.name
      })
    default:
      return state
  }
}
