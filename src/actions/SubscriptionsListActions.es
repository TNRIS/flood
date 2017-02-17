import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  PROCESS_SUBSCRIPTIONS } from '../constants/SubscriptionsListActionTypes'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'


export function getSubscriptionsError(error) {
  console.log(error)
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

export function processSubscriptions(email, phone, subscriptions) {
  return {
    type: PROCESS_SUBSCRIPTIONS,
    email,
    phone,
    subscriptions
  }
}

export function getSubscriptionsSuccess(email, phone, subscriptions) {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS,
    email,
    phone,
    subscriptions
  }
}

function processSubscriptions(email, phone, allSubscriptions) {
  return new Promise((resolve, reject) => {
    const subscriptions = []
    allSubscriptions.forEach((sub) => {
      const endpoint = sub.Endpoint
      const topic = sub.TopicArn.split(":").pop()
      if (endpoint === phone) {
        subscriptions[topic] = subscriptions[topic] || {"gage": topic, "email": null, "phone": null}
        subscriptions[topic].phone = sub
      }
      else if (endpoint === email) {
        subscriptions[topic] = subscriptions[topic] || {"gage": topic, "email": null, "phone": null}
        subscriptions[topic].email = sub
      }
    })
    resolve(subscriptions)
  })
}

export function getSubscriptions(email, phone) {
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return (dispatch) => {
    dispatch(getSubscriptionsAttempt)
    return sns.listSubscriptions().promise().then(
      results => dispatch(getSubscriptionsSuccess(email, phone, results.Subscribe))
    )
  }
}
