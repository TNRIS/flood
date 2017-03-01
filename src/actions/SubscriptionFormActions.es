import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SUBSCRIPTION_FORM_UPDATED } from '../constants/SubscriptionFormActionTypes'

import {
  seedSubscriptionList
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
    return sns.listSubscriptions({NextToken: nextToken}).promise().then(
      results => {
        // Set a counter to zero for iterating through the AWS SDK response
        let counter = 0

        // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record
        const currentSubscriptions = getState().subscriptions
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")

        // Iterate through the records
        results.Subscriptions.forEach((sub) =>{
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()

          if (gagePattern.test(topic)) {
            const baseRecord = {
              "lid": topic,
              "email": {"subscription": null, "subscriptionAction": null, "subscribed": false, "id": topic + "_email"},
              "sms": {"subscription": null, "subscriptionAction": null, "subscribed": false, "id": topic + "_sms"}
            }

            if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) {
              currentSubscriptions[topic] = currentSubscriptions[topic] || baseRecord
              currentSubscriptions[topic].sms.subscription = sub
              currentSubscriptions[topic].sms.subscribed = true
            }
            if (email && endpoint === email) {
              console.log("Found email subscription" + " " + endpoint)
              currentSubscriptions[topic] = currentSubscriptions[topic] || baseRecord
              currentSubscriptions[topic].email.subscription = sub
              currentSubscriptions[topic].email.subscribed = true
            }
          }
          counter++
          if (counter === results.Subscriptions.length) {
            if (results.NextToken) {
              dispatch(getUserSubscriptions(email, phone, results.NextToken))
            }
            else {
              dispatch(getSubscriptionsSuccess())
              console.log(currentSubscriptions)
              dispatch(seedSubscriptionList(currentSubscriptions))
            }
          }
        })
      },
      error => console.log(error)
    )
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
