import React from 'react'
import { Content, Layout } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'
import AboutContainer from '../containers/AboutContainer'
import ToasterContainer from '../containers/ToasterContainer'

ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <AboutContainer />
    <Layout fixedDrawer style={{background: 'white'}}>
      <NavigationDrawer/>
      <Content>
        <MapContainer />
      </Content>
      <ToasterContainer />
    </Layout>
  </div>
)

export default App
