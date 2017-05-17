import {
  LOGIN_ATTEMPT,
  LOGIN_FAILED,
  LOGIN_SUCCESSFUL,
  NEW_PASSWORD_REQUIRED,
  SET_SYNC_SESSION_TOKEN
} from '../constants/UserActionTypes'

const initialState = {
  authentication: 100,
  error: null
}

/**
 * Authentication Status Codes
 * 0 - Successful
 * 10 - Attempting Login
 * 20 - New Password Required
 * 99 - Failed
 * 100 - Unauthenticated
 */

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {authentication: 10, error: null}
    case LOGIN_FAILED:
      return {...action.payload, authentication: 99}
    case LOGIN_SUCCESSFUL:
      return {...state, ...action.payload, authentication: 0}
    case NEW_PASSWORD_REQUIRED:
      return {...state, ...action.payload, authentication: 20}
    case SET_SYNC_SESSION_TOKEN:
      return {...state, ...action.payload}
    default:
      return state
  }
}
