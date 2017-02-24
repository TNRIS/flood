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
  email: '',
  phone: '',
  currentSubscriptions: {},
  error: null,
  isFetching: false,
  nextToken: ''
}

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SUBSCRIPTIONS:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        currentSubscriptions: {}
      })
    case GET_SUBSCRIPTIONS_ATTEMPT:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        isFetching: true,
      })
    case GET_SUBSCRIPTIONS_ERROR:
      return objectAssign({}, state, {
        error: action.error,
        isFetching: false
      })
    case GET_SUBSCRIPTIONS_SUCCESS:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        currentSubscriptions: action.currentSubscriptions,
        error: null,
        isFetching: false
      })
    case SAVE_SUBSCRIPTION_CHANGES_ATTEMPT:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        currentSubscriptions: action.currentSubscriptions,
        error: null,
        isFetching: true
      })
    case SAVE_SUBSCRIPTION_CHANGES_SUCCESS:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        currentSubscriptions: action.currentSubscriptions,
        error: null,
        isFetching: false
      })
    case SUBSCRIPTION_FORM_UPDATED:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        currentSubscriptions: {},
        error: null,
        isFetching: false
      })
    default:
      return state
  }
}
