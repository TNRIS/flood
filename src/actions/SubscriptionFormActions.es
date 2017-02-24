import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SUBSCRIPTION_FORM_UPDATED } from '../constants/SubscriptionFormActionTypes'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import subscribeAlerts from '../util/FloodAlerts'

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

export function getSubscriptionsAttempt(email, phone) {
  return {
    type: GET_SUBSCRIPTIONS_ATTEMPT,
    email,
    phone
  }
}

export function getSubscriptionsSuccess(email, phone, currentSubscriptions) {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS,
    email,
    phone,
    currentSubscriptions
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
        let counter = 0
        const currentSubscriptions =  getState().subscriptions.currentSubscriptions
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")
        results.Subscriptions.forEach((sub) =>{
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()
          if (gagePattern.test(topic)) {
            if (endpoint === ("+1" + phone) || endpoint === phone) {
              currentSubscriptions[topic] = currentSubscriptions[topic] || {"gage": topic, "email": null, "phone": null, "add": null, "remove": null}
              currentSubscriptions[topic].phone = sub
            }
            else if (endpoint === email) {
              currentSubscriptions[topic] = currentSubscriptions[topic] || {"gage": topic, "email": null, "phone": null, "add": null, "remove": null}
              currentSubscriptions[topic].email = sub
            }
          }
          counter++
          if (counter === results.Subscriptions.length) {
            if (results.NextToken) {
              dispatch(getUserSubscriptions(email, phone, results.NextToken))
            }
            else {
              dispatch(getSubscriptionsSuccess(email, phone, currentSubscriptions))
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
