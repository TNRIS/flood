import objectAssign from 'object-assign'
import { SET_GAGE_INIT } from '../constants/MapActionTypes'

const initialState = {}
//create the reducer as an empty state initially. call the initialStatus()
//function immediately to retrieve the current stage of all flood gauges
//and store them in this reducer for routine stage change comparisons.
//Any gauges with a stage change to a higher flood stage will send notifications
export default function gageInfo(state = initialState, action) {
  switch (action.type) {
    case SET_GAGE_INIT:
      return objectAssign({}, action.initState)
    default:
      return state
  }
}
