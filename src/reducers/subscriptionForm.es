import objectAssign from 'object-assign'

import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  DISPLAY_FORM} from '../constants/SubscriptionFormActionTypes'

const initialState = {
  error: null,
  isFetching: false,
  nextToken: null,
  displayForm: "login"
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
    case DISPLAY_FORM:
      return objectAssign({}, state, {
        displayForm: action.form
      })
    default:
      return state
  }
}
