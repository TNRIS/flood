import {
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS,
} from '../constants/SubscriptionListActionTypes'

const initialState = {
  error: null,
  isUpdating: false
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
      return {...state, isUpdating: true}
    case UPDATE_SUBSCRIPTIONS_ERROR:
      return {...state, isUpdating: false, error: action.error}
    case UPDATE_SUBSCRIPTIONS_SUCCESS:
      return {...state, ...{isUpdating: false, error: null}}
    default:
      return state
  }
}
