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
  SET_SYNC_SESSION_TOKEN,
  SHOW_USER_SETTINGS } from '../constants/UserActionTypes'

import { swapDisplayForm,
  getSubscriptionsAttempt,
  getSubscriptionsSuccess,
  getSubscriptionsError } from './SubscriptionFormActions'

import { clearSubscriptionList } from './SubscriptionListActions'

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

export function loginSuccessful() {
  return {
    type: LOGIN_SUCCESSFUL
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

export function showUserSettings() {
  return {
    type: SHOW_USER_SETTINGS
  }
}

export function userLogin(username, password) {
  return (dispatch) => {
    dispatch(loginAttempt())
    dispatch(getSubscriptionsAttempt())
    FloodAppUser.setCognitoUser({Username: username, Password: password})

    return FloodAppUser.authenticate((result) => {
      if (result === 0) {
        dispatch(showSnackbar(`Hello ${username}!!`))
        dispatch(loginSuccessful())
        dispatch(getUserSubscriptions(FloodAppUser.idToken, ""))
      }
      else {
        dispatch(getSubscriptionsError())
      }
    })
  }
}

export function userSignUp(username, password, phone, email) {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    FloodAppUser.setCognitoUser({Username: username, Password: password})
    FloodAppUser.setUserAttributes({Phone: phone, Email: email})

    return FloodAppUser.signUp((result) => {
      if (result === 0) {
        dispatch(swapDisplayForm('verify'))
        dispatch(getSubscriptionsSuccess())
      }
      else {
        dispatch(getSubscriptionsError())
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

export function userVerify(verificationCode) {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return FloodAppUser.confirmSignup(verificationCode, (result) => {
        if (result === 0) {
          FloodAppUser.authenticate((result) => {
            if (result === 0) {
              dispatch(showSnackbar(`Hello ${FloodAppUser.username}!!`))
              dispatch(loginSuccessful(FloodAppUser.username, {...result, ...FloodAppUser.userData, FloodAppUser}))
              dispatch(getUserSubscriptions(FloodAppUser.idToken, ""))
            }
          })
        }
        else {
            dispatch(getSubscriptionsError())
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

export function resendVerificationCode() {
  return (dispatch) => {
    return FloodAppUser.resendVerificationCode((result) => {
      if (result === 0) {
        dispatch(showSnackbar("New verification code sent. The previous code is now invalid."))
      }
      else {
        if (result == "CodeMismatchException: Invalid verification code provided, please try again.") {
          dispatch(showSnackbar("Incorrect validation code. Please try again."))
        }
        else {
          dispatch(sendErrorReport(result))
          dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
        }
      }
    })
  }
}

export function forgotPassword(username) {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return FloodAppUser.forgotPassword(username, (result) => {
      if (result === 0) {
        dispatch(showSnackbar('Code sent to: ' + username))
        dispatch(swapDisplayForm('newPassword'))
        dispatch(getSubscriptionsSuccess())
      }
      else {
        dispatch(getSubscriptionsError())
        if (result == "UserNotFoundException: Username/client id combination not found.") {
          dispatch(showSnackbar("Username/Phone Number not found. Please check the spelling and try again."))
        }
        else {
          dispatch(sendErrorReport(result))
          dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
        }
      }
    })
  }

}

export function newPassword(verificationCode, password) {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return FloodAppUser.confirmPassword(verificationCode, password, (result) => {
        if (result === 0) {
            dispatch(swapDisplayForm('login'))
            dispatch(showSnackbar("Your password has been reset."))
            dispatch(getSubscriptionsSuccess())
        }
        else {
            console.log(result)
            dispatch(getSubscriptionsError())
            if (result == "InvalidParameterException: Cannot reset password for the user as there is no registered/verified email or phone_number") {
              dispatch(showSnackbar("No verified phone number for this username. Please check the spelling or try using your phone number."))
            }
            else if (result == "CodeMismatchException: Invalid verification code provided, please try again.") {
              dispatch(showSnackbar("Incorrect validation code. Please try again."))
            }
            else {
              dispatch(sendErrorReport(result))
              dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
            }
        }
    })
  }

}

export function userSignOut() {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return FloodAppUser.signOut((result) => {
      if (result === 0) {
        dispatch(swapDisplayForm('login'))
        dispatch(clearSubscriptionList())
        dispatch(showSnackbar("You have successfully signed out."))
        dispatch(getSubscriptionsSuccess())
      }
      else {
        dispatch(getSubscriptionsError())
        dispatch(sendErrorReport(result))
        dispatch(showSnackbar("There was an error. The support team has been notified. Please try again."))
      }
    })
  }
}
