import {
  CLEAR_POPUP,
  POPUP_IMAGE_LOAD_SUCCESS,
  SET_POPUP
 } from '../constants/PopupActionTypes'

export default function popupData(state = {}, action) {
  switch (action.type) {
    case CLEAR_POPUP:
      return {}
    case POPUP_IMAGE_LOAD_SUCCESS:
      return {...state, imageLoaded: true}
    case SET_POPUP:
      return {...action.payload, imageLoaded: false}
    default:
      return state
  }
}
