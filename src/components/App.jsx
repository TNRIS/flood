import React from 'react'
import { Content, Layout, Header, HeaderRow } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import NavigationContainer from '../containers/NavigationContainer'
import MapContainer from '../containers/MapContainer'
import FeatureLayerChooser from '../containers/FeatureLayerChooser'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'
import PopupTitle from '../components/PopupTitle'

import { colors } from '../constants'


ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <Layout fixedDrawer style={{background: 'white'}}>
      <FeatureLayerChooser />
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
