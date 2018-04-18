import { expect } from 'chai'

import {
  LOGIN_ATTEMPT,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  NEW_PASSWORD_REQUIRED,
  SET_SYNC_SESSION_TOKEN,
  SHOW_USER_SETTINGS,
  USER_UNAUTHENTICATED } from '../../constants/UserActionTypes'

import {
  loginAttempt,
  loginError,
  loginSuccessful,
  newPasswordRequired,
  unauthenticateUser,
  setSyncSessionToken,
  showUserSettings
} from '../UserActions'


describe('actions: UserActions', () => {

  it("should create an action to change the user's status as attempting login", () => {
    const expectedAction = {
      type: LOGIN_ATTEMPT
    }
    expect(loginAttempt()).to.deep.equal(expectedAction)
  })

  it("should create an action to change the user's status as login errored", () => {
    const sampleError = "Ugh!"
    const expectedAction = {
      type: LOGIN_ERROR,
      payload: {error: sampleError}
    }
    expect(loginError(sampleError)).to.deep.equal(expectedAction)
  })

  it("should create an action to change the user's status as login successful", () => {
    const expectedAction = {
      type: LOGIN_SUCCESSFUL
    }
    expect(loginSuccessful()).to.deep.equal(expectedAction)
  })

  it("should create an action to change the user's status as needing a new password", () => {
    const sampleUsername = "GISCAT"
    const expectedAction = {
      type: NEW_PASSWORD_REQUIRED,
      username: sampleUsername
    }
    expect(newPasswordRequired(sampleUsername)).to.deep.equal(expectedAction)
  })

  it("should create an action to change the user's status as unauthenticated", () => {
    const expectedAction = {
      type: USER_UNAUTHENTICATED
    }
    expect(unauthenticateUser()).to.deep.equal(expectedAction)
  })

  it("should create an action to set the the user's sync token", () => {
    const sampleToken = '8888ddddkkdDevildmsnlksenlsd666spefmselmf;es'
    const expectedAction = {
      type: SET_SYNC_SESSION_TOKEN,
      payload: {
        SyncSessionToken: sampleToken
      }
    }
    expect(setSyncSessionToken(sampleToken)).to.deep.equal(expectedAction)
  })

  it("should create an action to display the user's settings", () => {
    const expectedAction = {
      type: SHOW_USER_SETTINGS
    }
    expect(showUserSettings()).to.deep.equal(expectedAction)
  })

})
