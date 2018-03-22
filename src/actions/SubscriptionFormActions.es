import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  DISPLAY_FORM,
  NO_SUBSCRIPTIONS_FOUND
} from '../constants/SubscriptionFormActionTypes'

import {
  addSubscriptionToSubscriptionList,
  clearSubscriptionList
} from './SubscriptionListActions'

import {
  showSnackbar
} from './ToasterActions'

import FloodAppUser from '../util/User'

/**
 * Action that clears all subscription data from the app store
 * @return {object} action
 */
export function clearSubscriptions() {
  return {
    type: CLEAR_SUBSCRIPTIONS
  }
}

/**
 * Action that indicates the beginning of an attempt to get subscriptions from Amazon
 * @return {object} action
 */
export function getSubscriptionsAttempt() {
  return {
    type: GET_SUBSCRIPTIONS_ATTEMPT,
  }
}

/**
 * Action that for an error in the get subscriptions API call
 * @param  {object} error error returned from Amazon
 * @return {object}       action
 */
export function getSubscriptionsError(error) {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    error
  }
}

/**
 * Action for success in gathering subscriptions
 * @return {object} action
 */
export function getSubscriptionsSuccess() {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS
  }
}

/**
 * Action for no subscriptions found
 */
export function noSubscriptionsFound() {
  return {
    type: NO_SUBSCRIPTIONS_FOUND
  }
}

/**
 * Action for swapping between the sign up and login forms
 * @param  {string} form     form to display. valid values: login, signUp, verify
 * @return {object} action
 */
export function swapDisplayForm(form) {
  return {
    type: DISPLAY_FORM,
    form
  }
}


/**
 * Function to get all subscriptions from Amazon and filter for subscriptions
 * that match the user's email and phone number
 * @param  {string} email     user's email
 * @param  {string} phone     user's phone number
 * @param  {string} nextToken token for the next API call if there are still more records to retrieve
 */
export function getUserSubscriptions() {
  return (dispatch) => {
    dispatch(getSubscriptionsAttempt())
    return FloodAppUser.checkForSubscriptions((records) => {
      if (records.length === 0) {
        // No subscriptions found
        dispatch(noSubscriptionsFound())
        dispatch(swapDisplayForm('noSubscriptions'))
        dispatch(showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications."))
      }
      else {
        // clear the existing list of subscriptions
        dispatch(clearSubscriptionList())

        // set counter to zero to iterate new list of subscriptions
        let counter = 0
        records.forEach(subscription => {
          counter++
          if (subscription.Value) {
            const subscriptionData = JSON.parse(subscription.Value)
            if (subscriptionData.lid.indexOf('--PD') === -1) {
              dispatch(
                addSubscriptionToSubscriptionList(
                  subscriptionData.lid, subscriptionData, subscriptionData.protocol, subscriptionData.endpoint
                )
              )
            }
          }
          if (counter === records.length) {
            dispatch(getSubscriptionsSuccess())
            dispatch(swapDisplayForm("SubscriptionList"))
          }
        })
      }
    })
  }
}
