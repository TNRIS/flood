import {
  CLEAR_POPUP,
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
