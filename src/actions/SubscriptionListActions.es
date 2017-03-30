import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS
} from '../constants/SubscriptionListActionTypes'

// Set initial value for subscription auto id
let nextSubscriptionId = 0

/**
 * Action to add a user's current subscription to the list of subscriptions in the store
 * @param  {string} lid          lid of gage
 * @param  {object} subscription the original subscription object as returned from Amazon
 * @param  {string} protocol     subscription protocol (email or sms)
 * @param  {string} endpoint     email or phone number the subscription is assigned to
 * @param  {string} sigstage     significant flood stage of gage
 * @return {object}              action
 */
export function addSubscriptionToSubscriptionList(lid, subscription, protocol, endpoint, sigstage) {
  return {
    type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
    payload: {
      id: nextSubscriptionId++,
      lid,
      subscription,
      protocol,
      endpoint,
      sigstage
    }
  }
}

/**
 * Action to clear all user subscription information in the app store
 * @return {object} action
 */
export function clearSubscriptionList() {
  return {
    type: CLEAR_SUBSCRIPTION_LIST
  }
}

/**
 * Action that a subscription update process has begun
 * @return {object} action
 */
export function updateSubscriptionsAttempt() {
  return {
    type: UPDATE_SUBSCRIPTIONS_ATTEMPT
  }
}

/**
 * Action that an error has occured in the update process
 * @param  {object} error error returned from the Amazon request
 * @return {object}       action
 */
export function updateSubscriptionsError(error) {
  return {
    type: UPDATE_SUBSCRIPTIONS_ERROR,
    error
  }
}

/**
 * Action that update process was successful for all chaneges
 * @return {object} action
 */
export function updateSubscriptionsSuccess() {
  return {
    type: UPDATE_SUBSCRIPTIONS_SUCCESS
  }
}
