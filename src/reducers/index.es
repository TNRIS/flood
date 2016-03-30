
import { combineReducers } from 'redux'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import map from './map'

const app = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
})

export default app
