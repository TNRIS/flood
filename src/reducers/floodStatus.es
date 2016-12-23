import L from 'leaflet'
import objectAssign from 'object-assign'
import * as types from '../actions/types'
import * as FloodAlerts from '../util/FloodAlerts'

FloodAlerts.initialStatus()
const initialState = {}

export default function floodStatus(state = initialState, action) {
  switch (action.type) {
    case types.SET_SIGSTAGE:
      return objectAssign({}, action.initState)
    case types.UPDATE_SIGSTAGE:
      let newState = objectAssign({}, state)
      newState[action.lid] = action.stage
      return newState
    default:
      return state
  }
}
