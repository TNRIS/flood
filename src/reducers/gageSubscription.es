import objectAssign from 'object-assign'

import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'


const addGageSubscriptionEntry = (state, action) => {
  return objectAssign({}, state, {
    [action.payload.lid]: {
      ...state[action.payload.lid],
      [action.payload.protocol]: action.payload.id,
      "lid": action.payload.lid,
      "sigstage": action.payload.sigstage
    }
  })
}

export const gageSubscriptionById = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST:
      return addGageSubscriptionEntry(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return {}
    default:
      return state
  }
}

export const addGageSubscriptionId = (state, action) => {
  if (state.indexOf(action.payload.lid) === -1) {
    return state.concat(action.payload.lid).sort()
  }
  return state
}

export const allGageSubscriptions = (state = [], action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST:
      return addGageSubscriptionId(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return []
    default:
      return state
  }
}
