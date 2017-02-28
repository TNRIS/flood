import {
  ADD_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTIONS,
  REMOVE_SUBSCRIPTION,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SEED_SUBSCRIPTION_LIST,
  TOGGLE_SUBSCRIPTION
} from '../constants/SubscriptionListActionTypes'

export const seedSubscriptionList = (subscriptions) => {
  return {
    type: SEED_SUBSCRIPTION_LIST,
    subscriptions
  }
}

const addToSubscriptionList = (subscriptionData) => {
  return {
    type: ADD_TO_SUBSCRIPTION_LIST,
    gage: subscriptionData.gage,
    email: subscriptionData.email,
    sms: subscriptionData.sms
  }
}

export const clearSubscriptions = () => {
  return {
    type: CLEAR_SUBSCRIPTIONS
  }
}

export const removeSubscription = () => {
  return {
    type: REMOVE_SUBSCRIPTION
  }
}

export const saveSubscriptionChangesAttempt = () => {
  return {
    type: SAVE_SUBSCRIPTION_CHANGES_ATTEMPT
  }
}

export const saveSubscriptionChangesSuccess = () => {
  return {
    type: SAVE_SUBSCRIPTION_CHANGES_SUCCESS
  }
}

export const toggleSubscription = () => {
  return {
    type: TOGGLE_SUBSCRIPTION
  }
}
