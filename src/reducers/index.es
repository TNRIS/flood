import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import floodStatus from './floodStatus'
import map from './map'
import subscribeDialog from './subscribeDialog'
import aboutDialog from './aboutDialog'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  floodStatus: floodStatus,
  subscribeDialog: subscribeDialog,
  aboutDialog: aboutDialog,
  browser: responsiveStateReducer
})
