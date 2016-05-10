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
    const { lid, name, updatePopup } = this.props
    const hydrographImage = `http://water.weather.gov/resources/hydrographs/${lid.toLowerCase()}_hg.png`
    return (
      <div>
        <PopupTitle icon={icon} title="Flood Gage Information" />
        <PopupContent>
          <PopupHeader>
            { name } ({ lid.toUpperCase() })
          </PopupHeader>
          <PopupImage src={hydrographImage} updatePopup={updatePopup} />
        </PopupContent>
      </div>
    )
  }
}
