import objectAssign from 'object-assign'

import {
  SHOW_ABOUT_DIALOG,
  HIDE_ABOUT_DIALOG
} from '../constants/AboutActionTypes'

const initialState = {
  openDialog: false
}
//reducer for handling the about dialog. manages showing/hiding
//the dialog
export default function aboutDialog(state = initialState, action) {
  switch (action.type) {
    case SHOW_ABOUT_DIALOG:
      return objectAssign({}, state, {
        openDialog: true
      })
    case HIDE_ABOUT_DIALOG:
      return objectAssign({}, state, {
        openDialog: false
      })
    default:
      return state
  }
}
