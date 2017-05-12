import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS
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
    const WINDOW_AWS = window.AWS
    const sns = new WINDOW_AWS.SNS()

    const params = {
      DatasetName: 'texasflood',
      IdentityId: window.AWS.config.credentials.params.IdentityId,
      IdentityPoolId: keys.awsConfig.IdentityPoolId
    }

    const cognitoSync = new window.AWS.CognitoSync()
    return cognitoSync.listRecords(params, (err, data) => {
      if (err) console.log(err)
      else {
        let counter = 0
        console.log(data)
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
                dispatch(
                  showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications.")
                )
              }
            }
          }
        })
      }
    })

    // return sns.listSubscriptions({NextToken: nextToken}, (err, data) => {
    //   if (err) {
    //     dispatch(getSubscriptionsError(err))
    //   }
    //   if (data) {
    //     let counter = 0
    //     // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record
    //     if (!nextToken) {
    //       dispatch(clearSubscriptionList())
    //     }
    //     const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")
    //     // Iterate through the records
    //     data.Subscriptions.forEach((sub) => {
    //       const endpoint = sub.Endpoint
    //       const topic = sub.TopicArn.split(":").pop()
    //
    //       if (gagePattern.test(topic)) {
    //         if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) {
    //           dispatch(addSubscriptionToSubscriptionList(topic, sub, "sms", endpoint))
    //         }
    //         if (email && endpoint === email) {
    //           dispatch(addSubscriptionToSubscriptionList(topic, sub, "email", endpoint))
    //         }
    //       }
    //       counter++
    //       if (counter === data.Subscriptions.length) {
    //         if (data.NextToken) {
    //           dispatch(getUserSubscriptions(email, phone, data.NextToken))
    //         }
    //         else {
    //           dispatch(getSubscriptionsSuccess())
    //           if (getState().subscriptions.allSubscriptions.length === 0) {
    //             dispatch(
    //               showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications.")
    //             )
    //           }
    //         }
    //       }
    //     })
    //   }
    // })
  }
}
