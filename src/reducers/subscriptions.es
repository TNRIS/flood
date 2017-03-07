import { combineReducers } from 'redux'
import objectAssign from 'object-assign'

import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST,
  SEED_SUBSCRIPTION_LIST,
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE
} from '../constants/SubscriptionListActionTypes'

let subscriptionOperation

const initialState = {}

function addSubscriptionEntry(state, action) {
  const {payload} = action
  const {id, lid, subscription, protocol, endpoint} = payload

  const sub = {id, lid, subscription, protocol, endpoint, subscriptionAction: null}

  return {
    ...state,
    [id]: sub
  }
}

export const subscribe = (state) => {
  return objectAssign({}, state, {
    subscriptionAction: "Add"
  })
}

export const unsubscribe = (state, action) => {
  return {...state, [action.id]: {...state[action.id], subscriptionAction: "Remove" }}
}

export const subscriptionsById = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST:
      return addSubscriptionEntry(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return {}
    case MARK_SUBSCRIPTION_FOR_ADD:
      return subscribe(state, action)
    case MARK_SUBSCRIPTION_FOR_REMOVE:
      return unsubscribe(state, action)
    default:
      return state
  }
}

export const addSubscriptionId = (state, action) => {
  return state.concat(action.payload.id)
}

export const allSubscriptions = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST:
      return addSubscriptionId(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return []
    default:
      return state
  }
}
