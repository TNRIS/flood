import {
  HIDE_SNACKBAR,
  SHOW_SNACKBAR
} from '../constants/ToasterActionTypes'

export function hideSnackbar() {
  return {
    type: HIDE_SNACKBAR
  }
}

export function showSnackbar(toppings) {
  return {
    type: SHOW_SNACKBAR,
    payload: {
      snackbarText: toppings
    }
  }
}
