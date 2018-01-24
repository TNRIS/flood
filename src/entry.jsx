import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route } from 'react-router-dom'
import history from './history'

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
import './vendor/leaflet.label.js'
import './vendor/leaflet.label.css'

// Promise polyfill
require('es6-promise').polyfill()

let lastPath = ""

history.listen((ev, action) => {
  if (ev.action === "POP" && ev.pathname !== lastPath) {
    store.dispatch(setCenterAndZoom(32, -105, 12))
    console.log('history listen set')
  }
  console.log(lastPath)
  console.log(ev)
  lastPath = ev.pathname
})

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/gage/:lid" component={AppContainer} />
        <Route path="/map/@:lat,:lng,:zoom" component={AppContainer} />
        <Route path="/subscriptions" component={AppContainer} />
        <Route exact path="/*" component={AppContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('reactApp')
)
