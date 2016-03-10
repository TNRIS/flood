import React from 'react'
import { Content, Layout, Header } from 'react-mdl'

import NavigationBar from './NavigationBar'
import MapContainer from '../containers/MapContainer'

import { colors } from '../constants'

const App = () => (
  <div>
    <Layout fixedHeader style={{background: 'white'}}>
      <Header title="Texas Flood Information Viewer" style={{backgroundColor: colors.twdbBlue}}>
        <NavigationBar />
      </Header>
      <div className="site-warning">
        <strong>Warning:</strong> This site is in development and should not be relied upon for any real information.
      </div>
      <Content>
        <MapContainer />
      </Content>
    </Layout>
  </div>
)

export default App
