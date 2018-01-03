import React from 'react'
import { Navigation, Icon } from 'react-mdl'

import { preventDefault } from '../util'
import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

class NavigationBar extends React.Component {
  render() {
    return (
      <Navigation>
        <a href="" onClick={preventDefault} id="baselayer-menu" title="Change Basemap">
          Basemap<Icon name="arrow_drop_down" />
        </a>
        <BaseLayerMenuContainer target="baselayer-menu" />
      </Navigation>
    )
  }
}

export default NavigationBar
