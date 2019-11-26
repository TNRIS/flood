import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'

import AppContainer from './containers/AppContainer'

import { store } from './store'
import './sass/main.scss'

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
