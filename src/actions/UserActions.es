
import AWS from 'aws-sdk'

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js'


import keys from '../keys'

import {
  showSnackbar
} from './ToasterActions'

import {
  LOGIN_ATTEMPT,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  NEW_PASSWORD_REQUIRED } from '../constants/UserActionTypes'


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

export function userLogin(username, password) {
  return (dispatch) => {
    dispatch(loginAttempt())

    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)

    const poolData = {
      UserPoolId: 'us-east-1_3LyfiOdWZ',
      ClientId: '602n2i4g3loov3mnml95gdpoad'
    }
    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
    const userData = {
      Username: authenticationData.Username,
      Pool: userPool
    }
    const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData)
    return cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        dispatch(showSnackbar(`Hello ${username}!!`))
        let userData

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: keys.awsConfig.IdentityPoolId,
          Logins: {
            [keys.awsConfig.logins.cognito.identityProviderName]: result.getIdToken().getJwtToken()
          }
        })
        // Use the AWS service
        cognitoUser.getUserAttributes((err, att) => {
          if (err) console.log(err)
          else {
            const user = {}
            for (let i = 0; i < att.length; i++) {
              console.log(att[i])
              user[att[i].Name] = att[i].Value
            }
            userData = {...user}
          }
          dispatch(loginSuccessful(username, {...result, ...userData}))
        })
      },
      newPasswordRequired: (userAttributes) => {
        delete userAttributes.email_verified
        delete userAttributes.phone_number_verified

        // dispatch new password required and show new password dialog
        dispatch(newPasswordRequired(username))
        const newPassword = prompt("Please Enter A New Password")
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this)
      },
      onFailure: (err) => {
        dispatch(showSnackbar(err))
        dispatch(loginError(err))
      }
    })
  }
}
