import React, { Component } from 'react'
import PropTypes from 'prop-types'


import SubscriptionConfirmationContainer from '../containers/SubscriptionConfirmationContainer'

class PopupTitle extends Component {
  static propTypes = {
    leafletMap: PropTypes.object,
    icon: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object,
    showSubscriptionConfirmation: PropTypes.func,
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleShowSubscriptionConfirmation = this.handleShowSubscriptionConfirmation.bind(this)
  }

  closePopup() {
    const map = this.props.leafletMap
    this.props.clearPopup()
    map.closePopup()
  }

  handleShowSubscriptionConfirmation() {
    if (this.props.user.authentication === 0) {
      this.props.showSubscriptionConfirmation()
    }
    else {
      this.props.showSnackbar("Sign in to your account to add new subscriptions.")
    }
  }

  render() {
    return (
      <div className="popup-title">
        <img src={ this.props.icon } className="popup-icon" />
        <span className="popup-title-text">
          { this.props.title }
        </span>
        <button type="button" className="button popup-close" onClick={this.closePopup.bind(this)}>
          <i name="clear" className="fi-x"></i>
        </button>
          {this.props.title === "Flood Gage" &&
            <button type="button" className="button subscribe-button"
                    onClick={this.handleShowSubscriptionConfirmation}>
              <i className="fi-megaphone" name="notifications_active"></i>
              <span>Subscribe</span>
            </button>
          }
        <SubscriptionConfirmationContainer />
      </div>
    )
  }
}

export default PopupTitle
