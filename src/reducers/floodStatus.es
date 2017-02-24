import L from 'leaflet'
import objectAssign from 'object-assign'
import * as types from '../actions/types'
import * as FloodAlerts from '../util/FloodAlerts'

FloodAlerts.initialStatus()
const initialState = {}
//create the reducer as an empty state initially. call the initialStatus()
//function immediately to retrieve the current stage of all flood gauges
//and store them in this reducer for routine stage change comparisons.
//Any gauges with a stage change to a higher flood stage will send notifications
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
