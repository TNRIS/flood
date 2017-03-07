import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../constants/SubscriptionChangeActionTypes'

import {
  CLEAR_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'

const initialState = {}

function addChangeSubscribe(state, action) {
  const {payload} = action
  const {id, lid, protocol, subscriptionAction} = payload
  const change = {lid, protocol, subscriptionAction}

  return {
    ...state,
    [id]: {...change}
  }
}

function addChangeUnsubscribe(state, action) {
  const {payload} = action
  const {id, lid, protocol, subscriptionId, subscriptionAction} = payload
  const change = {lid, protocol, subscriptionId, subscriptionAction}

  return {
    ...state, [id]: {...change}
  }
}

function removeChangeFromQueue(state, action) {
  const {payload} = action
  const {id} = payload
  const {[id]: deletedChange, ...remainingState} = state

  return remainingState
}

export const subscriptionChangesById = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBE_TO_CHANGE_LIST:
      return addChangeSubscribe(state, action)
    case ADD_UNSUBSCRIBE_TO_CHANGE_LIST:
      return addChangeUnsubscribe(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return initialState
    case UNQUEUE_CHANGE_FROM_CHANGE_LIST:
      return removeChangeFromQueue(state, action)
    default:
      return state
  }
}

export const addSubscriptionChangeId = (state, action) => {
  return state.concat(action.payload.id)
}

export const removeSubscriptionChangeId = (state, action) => {
  const {payload} = action
  const {id} = payload

  return state.filter(item => item !== id)
}

export const allSubscriptionChanges = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBSCRIBE_TO_CHANGE_LIST:
      return addSubscriptionChangeId(state, action)
    case ADD_UNSUBSCRIBE_TO_CHANGE_LIST:
      return addSubscriptionChangeId(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return []
    case UNQUEUE_CHANGE_FROM_CHANGE_LIST:
      return removeSubscriptionChangeId(state, action)
    default:
      return state
  }
}
