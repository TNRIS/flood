import React from 'react'
import { Content, Layout, Header, HeaderRow } from 'react-mdl'

import NavigationContainer from '../containers/NavigationContainer'
import MapContainer from '../containers/MapContainer'
import FeatureLayerChooser from '../containers/FeatureLayerChooser'

import { colors } from '../constants'

const App = () => (
  <div>
    <Layout fixedHeader fixedDrawer style={{background: 'white'}}>
      <Header style={{backgroundColor: colors.twdbBlue}}>
        <HeaderRow className="site-warning">
          <strong>Warning:</strong> This site is currently in development and should not be relied upon for any real information.
        </HeaderRow>
      </Header>
      <FeatureLayerChooser />
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
