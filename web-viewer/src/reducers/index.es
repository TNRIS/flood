
import { combineReducers } from 'redux'

import baseLayers from './baseLayers'

const app = combineReducers({
  baseLayers: baseLayers,
})

export default app
