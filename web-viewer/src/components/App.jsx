import React from 'react';
import { Layout, Header, Navigation } from 'react-mdl';

import { colors } from '../constants';

const App = () => (
  <div>
    <Layout style={{background: 'white'}}>
      <Header transparent title="Texas Flood Information Viewer" style={{backgroundColor: colors.twdbBlue}}>
        <Navigation>
          <a href="">Flood Preparation</a>
          <a href="">About this Site</a>
        </Navigation>
      </Header>
    </Layout>
  </div>
);

export default App;
