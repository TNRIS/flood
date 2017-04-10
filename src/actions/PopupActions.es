import {
  CLEAR_POPUP,
  SET_POPUP
} from '../constants/MapActionTypes'


export function clearPopup() {
  return {
    type: CLEAR_POPUP
  }
}

export function setPopup(popupData) {
  const {id, data} = popupData
  return {
    type: SET_POPUP,
    payload: {
      id,
      data
    }
  }
}
