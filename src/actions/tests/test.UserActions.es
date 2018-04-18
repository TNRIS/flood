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
  showUserSettings,
  userLogin,
  userSignUp,
  userVerify,
  resendVerificationCode,
  forgotPassword,
  newPassword,
  userSignOut,
  siteReset,
  deleteAccount,
  retrieveUser
} from '../UserActions'


describe('actions: UserActions', () => {
  const sampleUsername = "GISCAT"
  const samplePassword = 'Mesothelioma'
  const samplePhone = "+11234568790"
  const sampleEmail = "satan@hellview.com"

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

  it('should create & return a function to authenticate the login credentials', () => {
    const loginFunc = userLogin(sampleUsername, samplePassword)
    // this test can be elaborated to deep dive into the function itself
    expect(loginFunc).to.be.a('function')
  })

  it('should create & return a function to sign up the new user account', () => {
    const signupFunc = userSignUp(sampleUsername, samplePassword, samplePhone, sampleEmail)
    // this test can be elaborated to deep dive into the function itself
    expect(signupFunc).to.be.a('function')
  })

  it('should create & return a function to verify the new user account with a code', () => {
    const sampleVerificationCode = "123666"
    // this test can be elaborated to deep dive into the function itself
    expect(userVerify(sampleVerificationCode)).to.be.a('function')
  })

  it('should create & return a function to resend a previously dispatched verification code', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(resendVerificationCode()).to.be.a('function')
  })

  it('should create & return a function to retrieve a forgotten password', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(forgotPassword()).to.be.a('function')
  })

  it('should create & return a function to reset a forgotten password', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(newPassword()).to.be.a('function')
  })

  it('should create & return a function to signout the authenticated user', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(userSignOut()).to.be.a('function')
  })

  it('should create & return a function to signout the user and clear the site cache', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(siteReset()).to.be.a('function')
  })

  it('should create & return a function to delete the user account', () => {
    // this test can be elaborated to deep dive into the function itself
    const deleteFunction = deleteAccount()
    const dp = function dispatch (t) {
      return
    }
    expect(deleteFunction).to.be.a('function')
    expect(deleteFunction(dp)).to.be.a('promise')
  })

  it('should create & return a function to retrieve authenticated user account information', () => {
    // this test can be elaborated to deep dive into the function itself
    expect(retrieveUser()).to.be.a('function')
  })

})
