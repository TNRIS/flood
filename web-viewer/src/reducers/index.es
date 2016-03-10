
import { combineReducers } from 'redux'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'

const app = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
})

export default app
