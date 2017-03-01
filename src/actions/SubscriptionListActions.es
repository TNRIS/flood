import {
  CLEAR_SUBSCRIPTION_LIST,
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE,
  SEED_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS
} from '../constants/SubscriptionListActionTypes'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import subscribeAlerts from '../util/FloodAlerts'

import objectAssign from 'object-assign'

export function markSubscriptionForAdd(lid, protocol) {
  return {
    type: MARK_SUBSCRIPTION_FOR_ADD,
    lid,
    protocol
  }
}

export function markSubscriptionForRemove(lid, protocol) {
  return {
    type: MARK_SUBSCRIPTION_FOR_REMOVE,
    lid,
    protocol
  }
}

export function removeSubscription(subscriptionArn) {
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return sns.unsubscribe({SubscriptionArn: subscriptionArn}, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}

export function seedSubscriptionList(subscriptions) {
  return {
    type: SEED_SUBSCRIPTION_LIST,
    subscriptions
  }
}

export function updateSubscriptionsAttempt(subscriptions) {
  return {
    type: UPDATE_SUBSCRIPTIONS_ATTEMPT,
    subscriptions
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

export function clearSubscriptionList() {
  return {
    type: CLEAR_SUBSCRIPTION_LIST
  }
}
