import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../constants/ToasterActionTypes'

const initialState = {
  isSnackbarActive: false,
  snackbarText: "Just a test",
  snackbarTimeout: 2750
}

function snackbar(state, action) {
  const {payload} = action
  const {snackbarText} = payload
  const newSnackbar = {...state, snackbarText, isSnackbarActive: true}

  return {
    ...newSnackbar
  }
}

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
