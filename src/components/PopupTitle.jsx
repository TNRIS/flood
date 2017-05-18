import React, { Component, PropTypes } from 'react'
import { Button, Icon } from 'react-mdl'

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
    map.closePopup()
  }

  handleShowSubscriptionConfirmation() {
    if (this.props.user.authentication === 0) {
      this.props.showSubscriptionConfirmation()
    }
    else {
      this.props.showSnackbar("You must be signed in to your account to add new subscriptions.")
    }
  }

  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
        <Button className="popup__close mdl-color-text--white" onClick={this.closePopup.bind(this)}>
          <Icon
              name="clear"
              className="material-icons"
          />
        </Button>
          {this.props.title === "Flood Gage" &&
            <Button className="subscribe-button mdl-color-text--white"
                    onClick={this.handleShowSubscriptionConfirmation}>
              <Icon
                className="material-icons" name="notifications_active"/>
                Subscribe
            </Button>
          }
        <SubscriptionConfirmationContainer />
      </div>
    )
  }
}

export default PopupTitle
