import objectAssign from 'object-assign'

import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS} from '../constants/SubscriptionFormActionTypes'

const initialState = {
  error: null,
  isFetching: false,
  nextToken: null
}

/**
 * Actions upon the subscription form
 * @param  {Object} [state=initialState] the reducer's state
 * @param  {Object} action               action
 * @return {Object}                      the new state
 */
export default function subscriptionForm(state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_ATTEMPT:
      return objectAssign({}, state, {
        isFetching: true,
      })
    case GET_SUBSCRIPTIONS_ERROR:
      return objectAssign({}, state, {
        error: action.error,
        isFetching: false,
        nextToken: null
      })
    case GET_SUBSCRIPTIONS_SUCCESS:
      return objectAssign({}, state, {
        error: null,
        isFetching: false,
        nextToken: null
      })
    default:
      return state
  }
}
