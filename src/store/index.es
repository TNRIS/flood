import React from 'react'
import { createStore } from 'redux'

import { rootReducer  }from '../reducers'

export const store = (window.devToolsExtension ?
  window.devToolsExtension()(createStore)
  : createStore)(rootReducer)
