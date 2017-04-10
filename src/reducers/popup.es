import {
  CLEAR_POPUP,
  SET_POPUP
 } from '../constants/PopupActionTypes'

export default function popup(state = {}, action) {
  switch (action.type) {
    case CLEAR_POPUP:
      return {}
    case SET_POPUP:
      return {...action.payload}
    default:
      return state
  }
}
