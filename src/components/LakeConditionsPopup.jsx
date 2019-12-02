import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupTitle from './PopupTitle'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupImageContainer from '../containers/PopupImageContainer'

import { store } from '../store'
import {Provider} from 'react-redux'

import icon from '../images/boat_icon_popup_title.png'

export default class LakeConditionsPopup extends Component {
  static propTypes = {
    full_name: PropTypes.string,
    lake_url_name: PropTypes.string,
    leafletMap: PropTypes.object,
    updatePopup: PropTypes.func,
  }

  render() {
    const { full_name, lake_url_name, updatePopup } = this.props
    const image_src = `https://waterdatafortexas.org/reservoirs/api/individual/${lake_url_name}/recent-elevations-chart`
    const link_src = `https://waterdatafortexas.org/reservoirs/individual/${lake_url_name}`

    return (
      <div className="popup__container--lake" >
        <Provider store={store}>
          <PopupTitleContainer icon={icon} title="Lake Conditions" leafletMap={this.props.leafletMap}/>
        </Provider>
        <PopupContent>
          {/* <PopupHeader>
            { full_name }
          </PopupHeader> */}
          <Provider store={store}>
            <PopupImageContainer link={link_src} src={image_src} updatePopup={updatePopup} target="lake-conditions"/>
          </Provider>
        </PopupContent>
      </div>
    )
  }
}
