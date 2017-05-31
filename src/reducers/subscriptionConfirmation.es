import objectAssign from "object-assign"

import { SHOW_SUBSCRIPTION_CONFIRMATION, HIDE_SUBSCRIPTION_CONFIRMATION } from '../constants/SubscribeActionTypes'

const initialState = {
  showConfirmation: false
}
//reducer for handling the subscription form. manages showing/hiding
export default function subscriptionConfirmation(state = initialState, action) {
  switch (action.type) {
    case SHOW_SUBSCRIPTION_CONFIRMATION:
      return objectAssign({}, state, {
        showConfirmation: true
      })
    case HIDE_SUBSCRIPTION_CONFIRMATION:
      return objectAssign({}, state, {
        showConfirmation: false
      })
    default:
      return state
  }
}
