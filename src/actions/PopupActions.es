import {
  CLEAR_POPUP,
  POPUP_IMAGE_LOAD_ATTEMPT,
  POPUP_IMAGE_LOAD_SUCCESS,
  SET_POPUP
} from '../constants/PopupActionTypes'

/**
 * Clears the popup content from the redux store
 * @return {object} action type
 */
export function clearPopup() {
  return {
    type: CLEAR_POPUP
  }
}

/**
 * Attempt to load the image into the popup
 * @return {object} load attempt marking the popupData.loaded property false
 */
export function popupImageLoadAttempt() {
  return {
    type: POPUP_IMAGE_LOAD_ATTEMPT,
    payload: {
      loaded: false
    }
  }
}

/**
 * Action when popup image was successfully loaded
 * @return {object} load success marking the popupData.loaded property true
 */
export function popupImageLoadSuccess() {
  return {
    type: POPUP_IMAGE_LOAD_SUCCESS,
    payload: {
      loaded: true
    }
  }
} 

/**
 * Action to set popup content in the Redux store
 * @param {object} popupData object describing the popup content
 */
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
