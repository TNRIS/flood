import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import App from './components/App'

import { store } from './store'

import './sass/main.scss'

// leaflet css and assets
import 'leaflet_css'
import 'leaflet_marker'
import 'leaflet_marker_2x'
import 'leaflet_marker_shadow'

// vendor css and js
import './vendor/material.css'
import './vendor/material.js'
import './vendor/Leaflet.BingLayer.js'
import './vendor/leaflet.TileLayer.WMTS.js'
import './vendor/leaflet.utfgrid.js'
import './vendor/leaflet.easy-button.js'
import './vendor/leaflet.easy-button.css'
import './vendor/Control.Geocoder.js'
import './vendor/Control.Geocoder.css'

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('reactApp'))
