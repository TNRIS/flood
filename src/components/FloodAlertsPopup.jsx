import React, { Component, PropTypes } from 'react'
import hash from 'object-hash'

import PopupTitle from './PopupTitle'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupText from './PopupText'

const icon = require('../images/flood_alert_white.png')

export default class FloodAlertsPopup extends Component {
  static propTypes = {
    response: PropTypes.array,
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
        <PopupTitle icon={icon} title="Weather Alert" />
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
