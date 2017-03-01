import React, { Component, PropTypes } from 'react'

import FloodGaugePopupTitleContainer from '../containers/FloodGaugePopupTitleContainer'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupImage from './PopupImage'

import { store } from '../store'
import {Provider} from 'react-redux'



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
      <div>
        <Provider store={store}>
          <FloodGaugePopupTitleContainer />
        </Provider>
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
