import objectAssign from 'object-assign'

import {
  SEED_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS,
} from '../constants/SubscriptionListActionTypes'

const initialState = {
  error: null,
  isFetching: false
}

export default function subscriptionList(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
