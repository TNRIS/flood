import objectAssign from 'object-assign'

import {
    STORE_GEOJSON
} from '../constants/MapActionTypes'

const initialState = {
    mapObject: null
}

export default function customLayer(state = initialState, action) {
  switch (action.type) {
    case STORE_GEOJSON:
      return objectAssign({}, state, {
        customGeoJson: action.customGeoJson
      })
    default:
      return state
  }
}
