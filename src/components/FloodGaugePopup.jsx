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
    popupWidth: PropTypes.number,
    browser: PropTypes.object,
  }

  render() {
    const { lid, name, hydrograph_image, updatePopup, popupWidth } = this.props
    return (
      <div>
        <PopupTitle icon={icon} title="Flood Gauge Information" />
        <PopupContent>
          <PopupHeader>
            { lid.toUpperCase() }: { name }
          </PopupHeader>
          <PopupImage src={hydrograph_image} updatePopup={updatePopup} popupWidth={popupWidth} />
        </PopupContent>
      </div>
    )
  }
}
