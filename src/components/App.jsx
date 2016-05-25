import React from 'react'
import { Content, Layout, Header, HeaderRow } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import NavigationContainer from '../containers/NavigationContainer'
import MapContainer from '../containers/MapContainer'
import FeatureLayerChooser from '../containers/FeatureLayerChooser'

import { colors } from '../constants'


ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Layout fixedDrawer style={{background: 'white'}}>
      <FeatureLayerChooser />
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
