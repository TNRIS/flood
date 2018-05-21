import {
  SHOW_ABOUT_DIALOG,
  HIDE_ABOUT_DIALOG
} from '../constants/AboutActionTypes'

export const showAboutDialog = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ABOUT_DIALOG
    })
  }
}

export const hideAboutDialog = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_ABOUT_DIALOG
    })
  }
}
