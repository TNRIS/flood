import React, { Component, PropTypes } from 'react'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupImageContainer from '../containers/PopupImageContainer'

import { store } from '../store'
import {Provider} from 'react-redux'


const icon = require('../images/flood_gauge_icon.png')

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
    const hydrographImage = `https://water.weather.gov/resources/hydrographs/${lid.toLowerCase()}_hg.png`
    const gaugeLink = `https://water.weather.gov/ahps2/hydrograph.php?wfo=${wfo.toLowerCase()}&gage=${lid.toLowerCase()}`
    return (
      <div className="flood-gage-popup">
        <Provider store={store}>
          <PopupTitleContainer icon={icon} title="Flood Gage" />
        </Provider>
        <PopupContent>
          <PopupHeader>
            { name } ({ lid.toUpperCase() })
          </PopupHeader>
          <Provider store={store}>
            <PopupImageContainer src={hydrographImage} link={gaugeLink} updatePopup={updatePopup}
                                 target="flood-gage-details"/>
          </Provider>
        </PopupContent>
      </div>
    )
  }
}
