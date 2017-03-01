import {
  CLEAR_SUBSCRIPTION_LIST,
  SEED_SUBSCRIPTION_LIST,
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE
} from '../constants/SubscriptionListActionTypes'

let subscriptionOperation

const subscription = (state = {}, action) => {
  switch (action.type) {
    case 'MARK_SUBSCRIPTION_FOR_ADD':
      if (state.lid !== action.lid) {
        return {...state}
      }
      subscriptionOperation = !state[action.protocol].subscribed ? "Add" : null
      return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: subscriptionOperation}}
    case 'MARK_SUBSCRIPTION_FOR_REMOVE':
      if (state.lid !== action.lid) {
        return {...state}
      }
      subscriptionOperation = state[action.protocol].subscribed ? "Remove" : null
      return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: subscriptionOperation}}
    default:
      return {...state}
  }
}

const initialState = {}

const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case SEED_SUBSCRIPTION_LIST:
      console.log("Updating subscription list")
      return {...initialState, ...action.subscriptions}
    case CLEAR_SUBSCRIPTION_LIST:
      return initialState
    case MARK_SUBSCRIPTION_FOR_ADD:
      return {...state, [action.lid]: subscription(state[action.lid], action)}
    case MARK_SUBSCRIPTION_FOR_REMOVE:
      return {...state, [action.lid]: subscription(state[action.lid], action)}
    default:
      return {...state}
  }
}

export default subscriptions
