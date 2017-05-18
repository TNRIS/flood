import {
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS,
} from '../constants/SubscriptionListActionTypes'

import {
  SHOW_USER_SETTINGS
} from '../constants/UserActionTypes'

const initialState = {
  error: null,
  isUpdating: false,
  view: "SubscriptionList"
}

/**
 * List of user's current subscriptions
 * @param  {Object} [state=initialState] reducer's state
 * @param  {Object} action               action
 * @return {Object}                      the new state
 */
export default function subscriptionList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SUBSCRIPTIONS_ATTEMPT:
      return {...state, isUpdating: true, view: "Spinner"}
    case UPDATE_SUBSCRIPTIONS_ERROR:
      return {...state, isUpdating: false, error: action.error, view: "SubscriptionList"}
    case UPDATE_SUBSCRIPTIONS_SUCCESS:
      return {...state, isUpdating: false, error: null, view: "SubscriptionList"}
    case SHOW_USER_SETTINGS:
      return {...state, view: "UserSettings"}
    default:
      return state
  }
}
