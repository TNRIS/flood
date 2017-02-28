import objectAssign from 'object-assign'

import {
  SEED_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'

const subscriptions = (state = {}, action) => {
  switch (action.type) {
    case SEED_SUBSCRIPTION_LIST:
      return objectAssign({}, state, action.subscriptions)
    default:
      return state
  }
}

export default subscriptions
