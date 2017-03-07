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

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

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

  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return sns.listSubscriptions({NextToken: nextToken}, (err, data) => {
      if (err) {
        dispatch(getSubscriptionsError(err))
      }
      if (data) {
        let counter = 0

        // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record
        if (!nextToken) {
          dispatch(clearSubscriptionList())
        }
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")
        // Iterate through the records
        data.Subscriptions.forEach((sub) => {
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()

          if (gagePattern.test(topic)) {
            if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) {
              dispatch(addSubscriptionToSubscriptionList(topic, sub, "sms", endpoint))
            }
            if (email && endpoint === email) {
              dispatch(addSubscriptionToSubscriptionList(topic, sub, "email", endpoint))
            }
          }
          counter++
          if (counter === data.Subscriptions.length) {
            if (data.NextToken) {
              dispatch(getUserSubscriptions(email, phone, data.NextToken))
            }
            else {
              dispatch(getSubscriptionsSuccess())
            }
          }
        })
      }
    })
  }
}
