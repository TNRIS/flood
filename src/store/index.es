import { compose, createStore } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'

import { rootReducer  }from '../reducers'

export const store = createStore(rootReducer, compose(
  responsiveStoreEnhancer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
