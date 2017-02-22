import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS } from '../constants/SubscriptionsActionTypes'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'


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
    dispatch(getSubscriptionsAttempt)
    return sns.listSubscriptions({NextToken: nextToken}).promise().then(
      results => {
        let counter = 0
        console.log(getState())
        const currentSubscriptions =  getState().subscriptions.currentSubscriptions
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")
        results.Subscriptions.forEach((sub) =>{
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()
          if (gagePattern.test(topic)) {
            if (endpoint === ("+1" + phone) || endpoint === phone) {
              currentSubscriptions[topic] = currentSubscriptions[topic] || {"gage": topic, "email": null, "phone": null}
              currentSubscriptions[topic].phone = sub
            }
            else if (endpoint === email) {
              currentSubscriptions[topic] = currentSubscriptions[topic] || {"gage": topic, "email": null, "phone": null}
              currentSubscriptions[topic].email = sub
            }
          }
          counter++
          if (counter === results.Subscriptions.length) {
            console.log(results)
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
