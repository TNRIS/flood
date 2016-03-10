import React from 'react'
import { Navigation } from 'react-mdl'

import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

const NavigationBar = () => (
  <Navigation>
    <a href="" onClick={(e) => e.preventDefault()} id="baselayer-menu">Basemap</a>
    <BaseLayerMenuContainer target="baselayer-menu" />
    <a href="">Flood Preparation</a>
    <a href="">About this Site</a>
  </Navigation>
)

export default NavigationBar