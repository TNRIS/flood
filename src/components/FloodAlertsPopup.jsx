import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hash from 'object-hash'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupTitle from './PopupTitle'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupText from './PopupText'

import { store } from '../store'
import {Provider} from 'react-redux'

import icon from '../images/flood_alert_red.png'

export default class FloodAlertsPopup extends Component {
  static propTypes = {
    response: PropTypes.array,
    leafletMap: PropTypes.object,
    updatePopup: PropTypes.func,
  }

  componentDidUpdate() {
    const { updatePopup } = this.props
    updatePopup()
  }

  render() {
    const { response } = this.props
    return (
      <div>
        <Provider store={store}>
          <PopupTitleContainer icon={icon} title="Weather Alert" leafletMap={this.props.leafletMap}/>
        </Provider>
        <PopupContent>
          {response.map(({ details }) => {
            const id = hash(details, { algorithm: 'md5', encoding: 'base64' })
            return (
              <div key={ id }>
                <PopupHeader>
                  { details.name }
                </PopupHeader>
                <PopupText>
                  { details.body }
                </PopupText>
              </div>
            )
          })}
        </PopupContent>
      </div>
    )
  }
}
