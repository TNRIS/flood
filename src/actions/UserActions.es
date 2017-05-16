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
  VERIFICATION_REQUIRED,
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

export function verificationRequired(username, phone) {
  return {
    type: VERIFICATION_REQUIRED,
    username,
    phone
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
    FloodAppUser.setCognitoUser({Username: username, Password: password})
    FloodAppUser.setUserAttributes({Phone: phone, Email: email})

    return FloodAppUser.signUp((result) => {
      if (result === 0) {
        dispatch(verificationRequired(username, phone))
        dispatch(swapDisplayForm('verify'))
      }
      else {
        console.log(result)
        if (result == "UsernameExistsException: User already exists") {
          dispatch(showSnackbar("This username is already registered. Please try a different username."))
        }
        else {
          dispatch(sendErrorReport(result))
          dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
        }
  }
    })
  }
}

export function userVerify(username, verificationCode) {
  return (dispatch) => {
    // dispatch(loginAttempt())

    return FloodAppUser.confirmSignup(verificationCode, (result) => {
        if (result === 0) {
          // console.log(FloodAppUser)
          // dispatch(swapDisplayForm('login'))
          FloodAppUser.authenticate((result) => {
            if (result === 0) {
              dispatch(showSnackbar(`Hello ${FloodAppUser.username}!!`))
              console.log(FloodAppUser)
              dispatch(loginSuccessful(FloodAppUser.username, {...result, ...FloodAppUser.userData, FloodAppUser}))
              dispatch(getUserSubscriptions(FloodAppUser.idToken, ""))
            }
          })
        }
        else {
            if (result == "CodeMismatchException: Invalid verification code provided, please try again.") {
              dispatch(showSnackbar("Incorrect validation code. Please try again."))
            }
            else if (result == "AliasExistsException: An account with the phone_number already exists.") {
              dispatch(swapDisplayForm('login'))
              dispatch(showSnackbar("An account with for this phone number already exists. Try 'Forgot Password'"))
              // at this point, the attempted account is created and stuck in a pergatory where the user
              // cannot log in since the account isn't confirmed, and since the account exists the username
              // is officially taken and cannot be used for any new account. we will need to come up with 
              // method to handle these pergatory accounts. i.e. delete them
            }
            else {
              dispatch(sendErrorReport(result))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
        }
        
        
    })
  }
}

export function resendVerificationCode(username) {
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
    return cognitoUser.resendConfirmationCode(function(err, result) {
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
        dispatch(showSnackbar("New verification code sent. The previous code is now invalid."))
        console.log('call result: ' + result)
    })
  }
}

export function forgotPassword(username) {
  return (dispatch) => {

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
    return cognitoUser.forgotPassword({
        onSuccess: function () {
            dispatch(showSnackbar("Your password has been reset."))
        },
        onFailure: function(err) {
            if (err == "UserNotFoundException: Username/client id combination not found.") {
              dispatch(showSnackbar("Username/Phone Number not found. Please check the spelling and try again."))
            }
            else {
              dispatch(sendErrorReport(err))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
            return
        },
        //Optional automatic callback
        inputVerificationCode: function(data) {
            dispatch(showSnackbar('Code sent to: ' + username))
            dispatch(verificationRequired(username, ""))
            dispatch(swapDisplayForm('newPassword'))
        }
    })
  }

}

export function newPassword(username, verificationCode, password) {
  return (dispatch) => {

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
    return cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: function () {
            dispatch(showSnackbar("Your password has been reset."))
        },
        onFailure: function(err) {
            alert(err)
            console.log(err)
            if (err == "InvalidParameterException: Cannot reset password for the user as there is no registered/verified email or phone_number") {
              dispatch(showSnackbar("No verified phone number for this username. Please check the spelling or try using your phone number."))
            }
            else if (err == "CodeMismatchException: Invalid verification code provided, please try again.") {
              dispatch(showSnackbar("Incorrect validation code. Please try again."))
            }
            else {
              dispatch(sendErrorReport(err))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
            return
        }
    })
  }

}
