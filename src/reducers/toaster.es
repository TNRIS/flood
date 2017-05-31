import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../constants/ToasterActionTypes'

// Set the initial state for the snackbar
const initialState = {
  isSnackbarActive: false,
  snackbarText: "",
  snackbarTimeout: 2750
}

/**
 * Update the snackbar section of the store
 * @param  {object} state  current state
 * @param  {object} action action to apply
 * @return {object}        new state
 */
function snackbar(state, action) {
  const {payload} = action
  const {snackbarText, snackbarTimeout } = payload
  const newSnackbar = {...state, snackbarText, snackbarTimeout, isSnackbarActive: true}

  return {
    ...newSnackbar
  }
}

/**
 * The toaster reducer
 * @param  {object} [state=initialState] state of the reducer
 * @param  {object} action               action to apply
 * @return {object}                      updated state
 */
export const toaster = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return snackbar(state, action)
    case HIDE_SNACKBAR:
      return initialState
    default:
      return state
  }
}
