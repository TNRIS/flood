import { combineReducers } from 'redux'

import {
  ADD_SUBSCRIPTION,
  CLEAR_SUBSCRIPTION_LIST,
  SEED_SUBSCRIPTION_LIST,
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE
} from '../constants/SubscriptionListActionTypes'

let subscriptionOperation

// function subscription(state, action) {
//   switch (action.type) {
//     case ADD_SUBSCRIPTION:
//       const sub = {
//         id: action.id,
//         lid: action.lid,
//         subscription: action.subscription,
//         protocol: action.protocol,
//         endpoint: action.endpoint
//       }
// 
//       return {
//         ...state,
//         [action.id]: sub
//       }
//     case 'MARK_SUBSCRIPTION_FOR_ADD':
//       if (state.lid !== action.lid) {
//         return {...state}
//       }
//       subscriptionOperation = !state[action.protocol].subscribed ? "Add" : null
//       return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: subscriptionOperation}}
//     case 'MARK_SUBSCRIPTION_FOR_REMOVE':
//       if (state.lid !== action.lid) {
//         return {...state}
//       }
//       subscriptionOperation = state[action.protocol].subscribed ? "Remove" : null
//       return {...state, [action.protocol]: {...state[action.protocol], subscriptionAction: subscriptionOperation}}
//     default:
//       return {...state}
//   }
// }

const initialState = {}
//
// const subscriptions = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_SUBSCRIPTION:
//       return {...state, [action.id]: subscription({}, action)}
//     case SEED_SUBSCRIPTION_LIST:
//       console.log("Updating subscription list")
//       return {...initialState, ...action.subscriptions}
//     case CLEAR_SUBSCRIPTION_LIST:
//       return initialState
//     case MARK_SUBSCRIPTION_FOR_ADD:
//       return {...state, [action.lid]: subscription(state[action.lid], action)}
//     case MARK_SUBSCRIPTION_FOR_REMOVE:
//       return {...state, [action.lid]: subscription(state[action.lid], action)}
//     default:
//       return {...state}
//   }
// }

function addSubscriptionEntry(state, action) {
  const sub = {
    id: action.id,
    lid: action.lid,
    subscription: action.subscription,
    protocol: action.protocol,
    endpoint: action.endpoint
  }
  console.log(...sub)
  return {
    ...state,
    [action.id]: sub
  }
}

export const subscriptionsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return addSubscriptionEntry(state, action)
    default:
      console.log("default subscriptions by id")
      return state
  }
}

export const allSubscriptions = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}
