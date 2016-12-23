import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import floodStatus from './floodStatus'
import map from './map'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  browser: responsiveStateReducer,
  floodStatus: floodStatus
})
