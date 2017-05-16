//
// import AWS from 'aws-sdk'
//
// import {
//   CognitoUserPool,
//   CognitoUserAttribute,
//   CognitoUser } from 'amazon-cognito-identity-js'

import { getUserSubscriptions } from './SubscriptionFormActions'

import keys from '../keys'

import {
  showSnackbar
} from './ToasterActions'

import {
  LOGIN_ATTEMPT,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  NEW_PASSWORD_REQUIRED,
  SET_SYNC_SESSION_TOKEN } from '../constants/UserActionTypes'

import { swapDisplayForm } from './SubscriptionFormActions'

import { sendErrorReport } from './StevieActions'

import FloodAppUser from '../util/User'

export function loginAttempt() {
  return {
    type: LOGIN_ATTEMPT
  }
}

export function loginError(err) {
  return {
    type: LOGIN_ERROR,
    payload: {error: err}
  }
}

export function loginSuccessful(username, userAuth) {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: {username, ...userAuth}
  }
}

export function newPasswordRequired(username) {
  return {
    type: NEW_PASSWORD_REQUIRED,
    username
  }
}

export function setSyncSessionToken(token) {
  return {
    type: SET_SYNC_SESSION_TOKEN,
    payload: {
      SyncSessionToken: token
    }
  }
}

export function userLogin(username, password) {
  return (dispatch) => {
    dispatch(loginAttempt())
    FloodAppUser.setCognitoUser({Username: username, Password: password})

    return FloodAppUser.authenticate((result) => {
      if (result === 0) {
        dispatch(showSnackbar(`Hello ${username}!!`))
        dispatch(loginSuccessful(username, {...result, ...FloodAppUser.userData, FloodAppUser}))
        dispatch(getUserSubscriptions(FloodAppUser.idToken, ""))
      }
    })
  }
}

export function userSignUp(username, password, phone, email) {
  return (dispatch) => {
    // dispatch(loginAttempt())

    const poolData = {
      UserPoolId: keys.awsConfig.UserPoolId,
      ClientId: keys.awsConfig.ClientId
    }
    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData)

    const attributeList = []

    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: `+1${phone}`
    }


    const dataEmail = {
      Name: 'email',
      Value: email
    }

    const attributePhoneNumber = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber)
    const attributeEmail = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail)

    attributeList.push(attributePhoneNumber)
    attributeList.push(attributeEmail)

    return userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err)
            if (err == "UsernameExistsException: User already exists") {
              dispatch(showSnackbar("This username is already registered. Please try a different username."))
            }
            else {
              dispatch(sendErrorReport(err))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
            return
        }
        // const cognitoUser = result.user
        // console.log('user name is ' + cognitoUser.getUsername());
        dispatch(swapDisplayForm('verify'))
    })
  }
}

export function userVerify(username, verificationCode) {
  return (dispatch) => {
    // dispatch(loginAttempt())

    const poolData = {
      UserPoolId: keys.awsConfig.UserPoolId,
      ClientId: keys.awsConfig.ClientId
    }
    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
    const userData = {
      Username: username,
      Pool: userPool
    }

    const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData)
    return cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
            if (err == "CodeMismatchException: Invalid verification code provided, please try again.") {
              dispatch(showSnackbar("Incorrect validation code. Please try again."))
            }
            else {
              dispatch(sendErrorReport(err))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
            return
        }
        console.log('call result: ' + result)
    })
  }
}
