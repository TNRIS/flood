import React from 'react'
import { Content, Layout, Header, Navigation } from 'react-mdl'

import MapContainer from '../containers/MapContainer'
import BaseLayerChooser from '../containers/BaseLayerChooser'

import { colors } from '../constants'

const App = () => (
  <div>
    <Layout fixedHeader style={{background: 'white'}}>
      <Header title="Texas Flood Information Viewer" style={{backgroundColor: colors.twdbBlue}}>
        <Navigation>
          <a href="">Flood Preparation</a>
          <a href="">About this Site</a>
        </Navigation>
      </Header>
      <div className="site-warning">
        <strong>Warning:</strong> This site is in development and should not be relied upon for any real information.
      </div>
      <BaseLayerChooser />
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
