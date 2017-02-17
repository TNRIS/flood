import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import floodStatus from './floodStatus'
import map from './map'
import subscribeDialog from './subscribeDialog'
import subscriptions from './subscriptions'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  floodStatus: floodStatus,
  subscribeDialog: subscribeDialog,
  browser: responsiveStateReducer,
  subscriptions: subscriptions
})
