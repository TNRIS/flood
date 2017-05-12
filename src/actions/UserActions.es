
import AWS from 'aws-sdk'

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js'

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
    AWS.config.update({region: 'us-east-1'})

    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)

    const poolData = {
      UserPoolId: keys.awsConfig.UserPoolId,
      ClientId: keys.awsConfig.ClientId
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

        window.AWS.config.update({region: 'us-east-1'})
        window.AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: keys.awsConfig.IdentityPoolId,
          Logins: {
            [keys.awsConfig.logins.cognito.identityProviderName]: result.getIdToken().getJwtToken()
          }
        }, {
          region: 'us-east-1'
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
          console.log(result)
          dispatch(getUserSubscriptions(result.getIdToken(), ""))
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
