import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'

import AppContainer from './containers/AppContainer'

import { store } from './store'
import './sass/main.scss'

// leaflet css and assets
import 'leaflet_css'
import 'leaflet_marker'
import 'leaflet_marker_2x'
import 'leaflet_marker_shadow'

// vendor css and js
import './vendor/Leaflet.BingLayer.js'
import './vendor/leaflet.TileLayer.WMTS.js'
import './vendor/leaflet.utfgrid.js'
import './vendor/leaflet.easy-button.js'
import './vendor/leaflet.easy-button.css'
import './vendor/Control.Geocoder.js'
import './vendor/Control.Geocoder.css'
import './vendor/leaflet.responsive-attribution.css'
import './vendor/leaflet.responsive-attribution.js'

// Promise polyfill
require('es6-promise').polyfill()

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/gage/:lid" component={AppContainer} />
        <Route path="/map/@:lat,:lng,:zoom" component={AppContainer} />
        <Route path="/subscriptions" component={AppContainer} />
        <Route path="/*" component={AppContainer} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('reactApp')
)
