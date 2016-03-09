
import React from 'react';
import ReactDOM from 'react-dom';
import {Layout, Header, Navigation, Drawer} from 'react-mdl';

import './sass/main.scss';

// vendor css and js
import './vendor/material.css';
import './vendor/material.js';

console.log("in entry.jsx");

//TODO: eslint config

ReactDOM.render((
  <Layout style={{background: 'white'}}>
    <Header transparent title="Title" style={{background: 'black'}}>
      <Navigation>
        <a href="">asdasdasd</a>
        <a href="">Link</a>
        <a href="">Link</a>
        <a href="">Link</a>
      </Navigation>
    </Header>
    <Drawer title="Title">
      <Navigation>
        <a href="">Link</a>
        <a href="">Link</a>
        <a href="">Link</a>
        <a href="">Link</a>
      </Navigation>
    </Drawer>
  </Layout>
), document.getElementById('reactApp'));

