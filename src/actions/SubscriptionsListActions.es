import {
  ADD_SUBSCRIPTION,
  CLEAR_SUBSCRIPTIONS,
  REMOVE_SUBSCRIPTION,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  TOGGLE_SUBSCRIPTION
} from '../constants/SubscriptionListActionTypes'

export const addSubscription = () => {
  return {
    type: ADD_SUBSCRIPTION
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
