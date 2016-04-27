import React, { Component, PropTypes } from 'react'

import PopupTitle from './PopupTitle'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupImage from './PopupImage'

const icon = require('../images/flood_gauge_white.png')

export default class FloodGaugePopup extends Component {
  static propTypes = {
    lid: PropTypes.string,
    name: PropTypes.string,
    hydrograph_image: PropTypes.string,
    updatePopup: PropTypes.func,
    browser: PropTypes.object,
  }

  render() {
    const { lid, name, hydrograph_image, updatePopup } = this.props
    return (
      <div>
        <PopupTitle icon={icon} title="Flood Gauge Information" />
        <PopupContent>
          <PopupHeader>
            { name } ({ lid.toUpperCase() })
          </PopupHeader>
          <PopupImage src={hydrograph_image} updatePopup={updatePopup} />
        </PopupContent>
      </div>
    )
  }
}
