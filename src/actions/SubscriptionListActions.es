import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS
} from '../constants/SubscriptionListActionTypes'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

let nextSubscriptionId = 0

export function addSubscriptionToSubscriptionList(lid, subscription, protocol, endpoint) {
  return {
    type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
    payload: {
      id: nextSubscriptionId++,
      lid,
      subscription,
      protocol,
      endpoint
    }
  }
}

export function clearSubscriptionList() {
  return {
    type: CLEAR_SUBSCRIPTION_LIST
  }
}

export function updateSubscriptionsAttempt() {
  return {
    type: UPDATE_SUBSCRIPTIONS_ATTEMPT
  }
}

export function updateSubscriptionsError(error) {
  return {
    type: UPDATE_SUBSCRIPTIONS_ERROR,
    error
  }
}

export function updateSubscriptionsSuccess() {
  return {
    type: UPDATE_SUBSCRIPTIONS_SUCCESS
  }
}
