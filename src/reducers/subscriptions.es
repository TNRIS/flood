import objectAssign from 'object-assign'

import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS } from '../constants/SubscriptionsActionTypes'

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
    default:
      return state
  }
}
