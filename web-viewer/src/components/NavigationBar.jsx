import React, { PropTypes } from 'react'
import { Navigation, Icon } from 'react-mdl'

import { preventDefault } from '../util'
import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

const NavigationBar = React.createClass({
  propTypes: {
    activeWeatherLayerId: PropTypes.string,
    onWeatherButtonClick: PropTypes.func.isRequired
  },
  onWeatherButtonClick(e) {
    preventDefault(e)
    if (this.props.activeWeatherLayerId) {
      this.props.onWeatherButtonClick(null)
    }
    else {
      this.props.onWeatherButtonClick('radar')
    }
  },
  render() {
    return (
      <Navigation>
        <a href="" onClick={this.onWeatherButtonClick} title="Toggle Weather Radar">
          {!this.props.activeWeatherLayerId && <Icon name="cloud_queue" />}
          {this.props.activeWeatherLayerId && <Icon name="cloud" />}
        </a>
        <a href="" onClick={preventDefault} id="baselayer-menu" title="Change Basemap">
          Basemap<Icon name="arrow_drop_down" />
        </a>
        <BaseLayerMenuContainer target="baselayer-menu" />
        <a href="">Flood Preparation</a>
        <a href="">About</a>
      </Navigation>
    )
  }
})

export default NavigationBar