import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  DISPLAY_FORM
} from '../constants/SubscriptionFormActionTypes'

import {
  addSubscriptionToSubscriptionList,
  clearSubscriptionList
} from './SubscriptionListActions'

import {
  showSnackbar
} from './ToasterActions'

import {
  setSyncSessionToken
} from './UserActions'

import axios from 'axios'
import AWS from 'aws-sdk'
import keys from '../keys'

/**
 * Extend the Array object with a contains method
 */
Array.prototype.contains = (waldo) => {
  for (i in this) {
    if (this[i] === waldo) return true
  }
  return false
}

/**
 * Action that clears all subscription data from the app store
 * @return {object} action
 */
export function clearSubscriptions() {
  return {
    type: CLEAR_SUBSCRIPTIONS
  }
}

/**
 * Action that indicates the beginning of an attempt to get subscriptions from Amazon
 * @return {object} action
 */
export function getSubscriptionsAttempt() {
  return {
    type: GET_SUBSCRIPTIONS_ATTEMPT,
  }
}

/**
 * Action that for an error in the get subscriptions API call
 * @param  {object} error error returned from Amazon
 * @return {object}       action
 */
export function getSubscriptionsError(error) {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    error
  }
}

/**
 * Action for success in gathering subscriptions
 * @return {object} action
 */
export function getSubscriptionsSuccess() {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS
  }
}

/**
 * Function to get all subscriptions from Amazon and filter for subscriptions
 * that match the user's email and phone number
 * @param  {string} email     user's email
 * @param  {string} phone     user's phone number
 * @param  {string} nextToken token for the next API call if there are still more records to retrieve
 */
export function getUserSubscriptions(idToken, nextToken) {
  return (dispatch, getState) => {
    dispatch(getSubscriptionsAttempt())

    const params = {
      IdentityId: window.AWS.config.credentials.params.IdentityId,
      IdentityPoolId: keys.awsConfig.IdentityPoolId
    }

    const cognitoSync = new window.AWS.CognitoSync()

    return cognitoSync.listDatasets(params, (err, data) => {
      if (err) {
        console.log(err)
      }
      else {
        if (data.Datasets.contains('texasflood')) {
          params.dataset = 'texasflood'

          cognitoSync.listRecords(params, (err, data) => {
            if (err) console.log(err)
            else {
              let counter = 0
              dispatch(setSyncSessionToken(data.SyncSessionToken))
              if (!nextToken) {
                dispatch(clearSubscriptionList())
              }
              data.Records.forEach(sub => {
                counter ++
                if (sub.Value) {
                  const subData = JSON.parse(sub.Value)
                  dispatch(addSubscriptionToSubscriptionList(subData.lid, subData, subData.protocol, subData.endpoint))
                }
                if (counter === data.Records.length) {
                  if (data.NextToken) {
                    dispatch(getUserSubscriptions(email, phone, data.NextToken))
                  }
                  else {
                    dispatch(getSubscriptionsSuccess())
                    if (getState().subscriptions.allSubscriptions.length === 0) {
                      dispatch(showSnackbar(
                          "No subscriptions found. Click a gage to subscribe and start receiving notifications."
                        ))
                    }
                  }
                }
              })
            }
          })
        }
        else {
          dispatch(showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications."))
        }
      }
    })
  }
}

/**
 * Action for swapping between the sign up and login forms
 * @param  {string} form     form to display. valid values: login, signUp, verify
 * @return {object} action
 */
export function swapDisplayForm(form) {
  return {
    type: DISPLAY_FORM,
    form
  }
}
