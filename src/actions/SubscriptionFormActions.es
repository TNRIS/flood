import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SUBSCRIPTION_FORM_UPDATED } from '../constants/SubscriptionFormActionTypes'

import {
  addSubscription,
  seedSubscriptionList,
  clearSubscriptionList
} from './SubscriptionListActions'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import subscribeAlerts from '../util/FloodAlerts'

import objectAssign from 'object-assign'

export function clearSubscriptions() {
  return {
    type: CLEAR_SUBSCRIPTIONS
  }
}
export function getSubscriptionsError(error) {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    error
  }
}

export function getSubscriptionsAttempt() {
  return {
    type: GET_SUBSCRIPTIONS_ATTEMPT,
  }
}

export function getSubscriptionsSuccess() {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS
  }
}

export function getUserSubscriptions(email, phone, nextToken) {
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return (dispatch, getState) => {
    dispatch(getSubscriptionsAttempt())
    return sns.listSubscriptions({NextToken: nextToken}, (err, data) => {
      if (err) {
        console.log(err)
      }
      if (data) {
        console.log(data)
        let counter = 0
        let currentSubscriptions

        // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record
        if (!nextToken) {
          dispatch(clearSubscriptionList())
        }

        currentSubscriptions = getState().subscriptions
        console.log(currentSubscriptions)

        console.log(getState().subscriptions)
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")

        // Iterate through the records
        data.Subscriptions.forEach((sub) => {
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()

          if (gagePattern.test(topic)) {
            if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) {
              dispatch(addSubscription(topic, sub, "sms", endpoint))
            }
            if (email && endpoint === email) {
              dispatch(addSubscription(topic, sub, "email", endpoint))
            }
          }
          counter++
          if (counter === data.Subscriptions.length) {
            if (data.NextToken) {
              dispatch(getUserSubscriptions(email, phone, data.NextToken))
            }
            else {
              dispatch(getSubscriptionsSuccess())
              // dispatch(seedSubscriptionList(currentSubscriptions))
            }
          }
        })
      }
    })
  }
}

export function saveSubscriptionChangesAttempt() {
  return {
    type: SAVE_SUBSCRIPTION_CHANGES_ATTEMPT
  }
}

export function saveSubscriptionChangesSuccess() {
  return {
    type: SAVE_SUBSCRIPTION_CHANGES_SUCCESS
  }
}

export function subscriptionFormUpdated() {
  return {
    type: SUBSCRIPTION_FORM_UPDATED
  }
}

export function saveSubscriptionUpdates() {
  return (dispatch, getState) => {
    dispatch(saveSubscriptionChangesAttempt)
    console.log(getState().subscriptions.currentSubscriptions)
    return () => {
      const subscriptions = getState().currentSubscriptions
      console.log(subscriptions)
      dispatch(saveSubscriptionChangesSuccess())
    }
  }
}
