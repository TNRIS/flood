import objectAssign from 'object-assign'

import {
  ADD_SUBSCRIPTION,
  CLEAR_SUBSCRIPTIONS,
  REMOVE_SUBSCRIPTION,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  TOGGLE_SUBSCRIPTION
} from '../constants/SubscriptionListActionTypes'


const subscription = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return objectAssign({}, state, {
      })
    case CLEAR_SUBSCRIPTIONS:
      return objectAssign({}, state, {
      })
    case REMOVE_SUBSCRIPTION:
      return objectAssign({}, state, {
      })
    case SAVE_SUBSCRIPTION_CHANGES_ATTEMPT:
      return objectAssign({}, state, {
      })
    case SAVE_SUBSCRIPTION_CHANGES_SUCCESS:
      return objectAssign({}, state, {
      })
    case TOGGLE_SUBSCRIPTION:
      return objectAssign({}, state, {
      })
    default:
      return state
  }
}

const subscriptions = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return [
        ...state, subscription(undefined, action)
      ]
    case CLEAR_SUBSCRIPTIONS:
      return [
        state, subscription(undefined, action)
      ]
    case REMOVE_SUBSCRIPTION:
      return [
        state, subscription(undefined, action)
      ]
    case SAVE_SUBSCRIPTION_CHANGES_ATTEMPT:
      return [
        state, subscription(undefined, action)
      ]
    case SAVE_SUBSCRIPTION_CHANGES_SUCCESS:
      return [
        state, subscription(undefined, action)
      ]
    case TOGGLE_SUBSCRIPTION:
      return [
        state, subscription(undefined, action)
      ]
    default:
      return state
  }
}

export default subscriptions
