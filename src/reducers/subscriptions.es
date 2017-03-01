import objectAssign from 'object-assign'

import {
  SEED_SUBSCRIPTION_LIST,
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE
} from '../constants/SubscriptionListActionTypes'

const subscription = (state = {}, action) => {
  switch (action.type) {
    case 'MARK_SUBSCRIPTION_FOR_ADD':
      if (state.lid !== action.lid) {
        return {...state}
      }
      return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: "Add"}}
    case 'MARK_SUBSCRIPTION_FOR_REMOVE':
      if (state.lid !== action.lid) {
        return {...state}
      }
      return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: "Remove"}}
    default:
      return {...state}
  }
}

const subscriptions = (state = {}, action) => {
  switch (action.type) {
    case SEED_SUBSCRIPTION_LIST:
      const currentSubscriptions = action.subscriptions
      return {...state, ...currentSubscriptions}
    case MARK_SUBSCRIPTION_FOR_ADD:
      return {...state, [action.lid]: subscription(state[action.lid], action)}
    case MARK_SUBSCRIPTION_FOR_REMOVE:
      return {...state, [action.lid]: subscription(state[action.lid], action)}
    default:
      return state
  }
}

export default subscriptions
