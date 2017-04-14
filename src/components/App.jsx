import React from 'react'
import { Content, Layout } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'
import AboutContainer from '../containers/AboutContainer'
import ToasterContainer from '../containers/ToasterContainer'
import FloodHeader from './FloodHeader'
import FloodFooter from './FloodFooter'

ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <AboutContainer />
    <Layout fixedHeader>
      <FloodHeader />
      <NavigationDrawer />
      <Content>
        <MapContainer />
      </Content>
      <FloodFooter />
      <ToasterContainer />
    </Layout>
  </div>
)

export default App
