import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'

/**
 * Process subscription payload to add a new subscription to the list
 * @param {object} state  state
 * @param {object} action action
 */
function addSubscriptionEntry(state, action) {
  const {payload} = action
  const {id, lid, subscription, protocol, endpoint} = payload

  const sub = {id, lid, subscription, protocol, endpoint, subscriptionAction: null}

  return {
    ...state,
    [id]: sub
  }
}

/**
 * Reducer to add a subscription to the list by ID
 * @param  {Object} [state={}] the reducer's state
 * @param  {Object} action     action
 * @return {Object}            the new state
 */
export const subscriptionsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST:
      return addSubscriptionEntry(state, action)
    case CLEAR_SUBSCRIPTION_LIST:
      return {}
    default:
      return state
  }
}

/**
 * Add a new subscription to the all subscriptions array
 * @param {Object} state  the reducer's state
 * @param {Object} action action
 * @return {Array} updated array
 */
export const addSubscriptionId = (state, action) => {
  return state.concat(action.payload.id)
}

/**
 * List of all subscription id
 * @param  {Array}  [state=[]] reducer's state
 * @param  {Object} action     action
 * @return {Object}            the new state
 */
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
