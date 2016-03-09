import React from 'react'
import { Content, Layout, Header, Navigation } from 'react-mdl'

import Map from './Map'
import LayerChooser from '../containers/LayerChooser'

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
      <LayerChooser />
      <Content>
        <Map />
      </Content>
    </Layout>
  </div>
)

export default App
