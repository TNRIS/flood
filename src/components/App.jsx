import React from 'react'
import { Content, Layout, Header, HeaderRow } from 'react-mdl'

import NavigationContainer from '../containers/NavigationContainer'
import MapContainer from '../containers/MapContainer'
import FeatureLayerChooser from '../containers/FeatureLayerChooser'

import { colors } from '../constants'

const App = () => (
  <div>
    <Layout fixedHeader fixedDrawer style={{background: 'white'}}>
      <FeatureLayerChooser />
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
