
import { combineReducers } from 'redux'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import map from './map'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
})
