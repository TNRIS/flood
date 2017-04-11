import {
  CLEAR_POPUP,
  POPUP_IMAGE_LOAD_ATTEMPT,
  POPUP_IMAGE_LOAD_SUCCESS,
  SET_POPUP
} from '../constants/PopupActionTypes'


export function clearPopup() {
  return {
    type: CLEAR_POPUP
  }
}

export function popupImageLoadAttempt() {
  return {
    type: POPUP_IMAGE_LOAD_ATTEMPT,
    payload: {
      loaded: false
    }
  }
}

export function popupImageLoadSuccess() {
  return {
    type: POPUP_IMAGE_LOAD_SUCCESS,
    payload: {
      loaded: true
    }
  }
}

export function setPopup(popupData) {
  const {id, data, clickLocation} = popupData
  return {
    type: SET_POPUP,
    payload: {
      id,
      data,
      clickLocation
    }
  }
}
