import React from 'react'
import { Content, Layout } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'


ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <Layout fixedDrawer style={{background: 'white'}}>
      <NavigationDrawer/>
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
