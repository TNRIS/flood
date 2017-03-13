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

/**
 * Add subscription change to queue of changes
 * @param {Object} state  the reducer's state
 * @param {Object} action the action upon th state
 * @return {Object}       the new state
 */
function addSubscriptionChange(state, action) {
  const {payload} = action
  const {id, lid, protocol, subscriptionId, subscriptionAction, changeRequestId} = payload
  const change = {id, lid, protocol, subscriptionId, subscriptionAction, changeRequestId}

  return {
    ...state,
    [id]: {...change}
  }
}

/**
 * Add subscription change ID to the list of updated subscriptions
 * @param {Object} state  the reducer's state
 * @param {Object} action the action upon the reducer
 * @return {Object}       the new state
 */
function addSubscriptionRequestUpdated(state, action) {
  const {payload} = action
  const {id, changeRequestId} = payload
  const change = {...state[id], changeRequestId}

  return {
    ...state,
    [id]: {...change}
  }
}

/**
 * Remove a queued change from the list of changes
 * @param  {Object} state  the reducer's state
 * @param  {Object} action the action upon the state
 * @return {Object}        the updated state
 */
function removeChangeFromQueue(state, action) {
  const {payload} = action
  const {id} = payload
  const {[id]: deletedChange, ...remainingState} = state // eslint-disable-line  no-unused-vars

  return remainingState
}

/**
 * Add a subscription change to the changes by ID
 * @param  {Object} [state=initialState] the reducer's state
 * @param  {Object} action               the action upon the reducer
 * @return {Object}                      the updated state
 */
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

/**
 * Add a subscription to the list of subscription change ID's
 * @param {Object} state  the reducer's state
 * @param {Object} action action upon the state
 * @returns {Array} the updated list of subscription changes
 */
export const addSubscriptionChangeId = (state, action) => {
  return state.concat(action.payload.id)
}

/**
 * Remove a subscription to the list of subscription change ID's
 * @param {Object} state  the reducer's state
 * @param {Object} action action upon the state
 * @returns {Array} the updated list of subscription changes
 */
export const removeSubscriptionChangeId = (state, action) => {
  const {payload} = action
  const {id} = payload

  return state.filter(item => item !== id)
}

/**
 * List of all subscription changes to be made on submit
 * @param  {Array}  [state=[]] the reducer's state
 * @param  {Object} action     action upon the reducer
 * @return {Array}             the updated state
 */
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

/**
 * Adds a processed subscription change to the list
 * @param {Object} state  reducer's state
 * @param {Object} action the action upon the state
 * @returns {Array}       the updated list
 */
export const addProcessedSubscriptionId = (state, action) => {
  return state.concat(action.payload.id)
}

/**
 * List of processed subscription changes
 * @param  {Array}  [state=[]] [description]
 * @param {Object} action the action upon the state
 * @returns {Array}       the updated list
 */
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
