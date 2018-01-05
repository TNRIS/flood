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
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
        <button type="button" className="button popup__close mdl-color-text--white" onClick={this.closePopup.bind(this)}>
          <i name="clear" className="material-icons">clear</i>
        </button>
          {this.props.title === "Flood Gage" &&
            <button type="button" className="button subscribe-button mdl-color-text--white"
                    onClick={this.handleShowSubscriptionConfirmation}>
              <i className="material-icons" name="notifications_active">
                Subscribe</i>
            </button>
          }
        <SubscriptionConfirmationContainer />
      </div>
    )
  }
}

export default PopupTitle
