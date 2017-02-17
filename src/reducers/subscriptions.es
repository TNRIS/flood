import objectAssign from 'object-assign'

import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  PROCESS_SUBSCRIPTIONS
} from '../constants/SubscriptionsListActionTypes'

const initialState = {
  email: '',
  phone: '',
  subscriptions: [],
  error: null,
  isFetching: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_ATTEMPT:
      return objectAssign({}, state, {
        isFetching: true
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
        subscriptions: action.subscriptions,
        error: null,
        isFetching: false
      })
    case PROCESS_SUBSCRIPTIONS:
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone,
        subscriptions: action.subscriptions,
        error: null,
        isFetching: false
      })
    default:
      return state
  }
}

export default function subscriptions(state = [], action) {
  
}
