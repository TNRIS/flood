import {
  HIDE_SNACKBAR,
  SHOW_SNACKBAR
} from '../constants/ToasterActionTypes'

/**
 * Action to hide the snackbar
 * @return {object} action
 */
export function hideSnackbar() {
  return {
    type: HIDE_SNACKBAR
  }
}

/**
 * Action to show the snackbar and insert a text message
 * @param  {string} toppings test to go in the snackbar
 * @return {object}          action
 */
export function showSnackbar(toppings, timeout = 2750) {
  return {
    type: SHOW_SNACKBAR,
    payload: {
      snackbarText: toppings,
      snackbarTimeout: timeout
    }
  }
}
