import objectAssign from 'object-assign'

import * as types from '../actions/types'

const initialState = {
  openDialog: false
}
//reducer for handling the about dialog. manages showing/hiding 
//the dialog 
export default function aboutDialog(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_ABOUT_DIALOG:
      return objectAssign({}, state, {
        openDialog: true
      })
    case types.HIDE_ABOUT_DIALOG:
      return objectAssign({}, state, {
        openDialog: false
      })
    default:
      return state
  }
}
