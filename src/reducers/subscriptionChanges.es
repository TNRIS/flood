import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  SUBSCRIPTION_UPDATED,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../constants/SubscriptionChangeActionTypes'

import {
  CLEAR_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'

const initialState = {}


function addSubscriptionChange(state, action) {
  const {payload} = action
  const {id, lid, protocol, subscriptionId, subscriptionAction, changeRequestId} = payload
  const change = {id, lid, protocol, subscriptionId, subscriptionAction, changeRequestId}

  return {
    ...state,
    [id]: {...change}
  }
}

function addSubscriptionRequestUpdated(state, action) {
  const {payload} = action
  const {id, changeRequestId} = payload
  const change = {...state[id], changeRequestId}

  return {
    ...state,
    [id]: {...change}
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
      return addSubscriptionChange(state, action)
    case ADD_UNSUBSCRIBE_TO_CHANGE_LIST:
      return addSubscriptionChange(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return initialState
    case SUBSCRIPTION_UPDATED:
      return addSubscriptionRequestUpdated(state, action)
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

export const addProcessedSubscriptionId = (state, action) => {
  return state.concat(action.payload.id)
}

export const allProcessedSubscriptions = (state = [], action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATED:
      return addProcessedSubscriptionId(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return []
    default:
      return state
  }
}
