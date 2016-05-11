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
    wfo: PropTypes.string,
    updatePopup: PropTypes.func,
    browser: PropTypes.object,
  }

  render() {
    const { lid, name, wfo, updatePopup } = this.props
    const hydrographImage = `http://water.weather.gov/resources/hydrographs/${lid.toLowerCase()}_hg.png`
    const gaugeLink = `http://water.weather.gov/ahps2/hydrograph.php?wfo=${wfo.toLowerCase()}&gage=${lid.toLowerCase()}`
    return (
      <div>
        <PopupTitle icon={icon} title="Flood Gage Information" />
        <PopupContent>
          <PopupHeader>
            { name } ({ lid.toUpperCase() })
          </PopupHeader>
          <PopupImage src={hydrographImage} link={gaugeLink} updatePopup={updatePopup} />
        </PopupContent>
      </div>
    )
  }
}
