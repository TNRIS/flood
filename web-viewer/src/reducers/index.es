
import { combineReducers } from 'redux'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import weatherLayer from './weatherLayer'

const app = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  weatherLayer: weatherLayer
})

export default app
