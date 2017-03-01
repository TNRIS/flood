import objectAssign from 'object-assign'

import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SUBSCRIPTION_FORM_UPDATED} from '../constants/SubscriptionFormActionTypes'

const initialState = {
  error: null,
  isFetching: false,
  nextToken: null
}

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
