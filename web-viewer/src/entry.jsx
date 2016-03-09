
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/App';
import app from './reducers';

import './sass/main.scss';

// vendor css and js
import './vendor/material.css';
import './vendor/material.js';


const store = createStore(app);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('reactApp'));
