import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import rootReducer from './reducers'

import './sass/main.scss'

// vendor css and js
import './vendor/material.css'
import './vendor/material.js'
import './vendor/Leaflet.BingLayer.js'
import './vendor/leaflet.TileLayer.WMTS.js'
import './vendor/leaflet.utfgrid.js'

const store = (window.devToolsExtension ?
  window.devToolsExtension()(createStore)
  : createStore)(rootReducer)

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('reactApp'))
