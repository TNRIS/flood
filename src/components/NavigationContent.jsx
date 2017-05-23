import React, { Component } from 'react'
import { Button, Icon } from 'react-mdl'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import SubscriptionFormContainer from '../containers/SubscriptionFormContainer'


class NavigationToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationContent: 'layers',
      showFeatureLayerChooser: this.props.navContentInitState.showFeatureLayerChooser,
      showSubscriptionForm: this.props.navContentInitState.showSubscriptionForm,
      userAuthentication: this.props.userAuthentication
    }

    this.handleSetNavigationUnsubscribe = this.handleSetNavigationUnsubscribe.bind(this)
    this.handleSetNavigationLayers = this.handleSetNavigationLayers.bind(this)
    this.handleSetSignInButton = this.handleSetSignInButton.bind(this)
  }

  componentDidMount() {
    if (this.state.showSubscriptionForm == true && this.props.browser.width < 1025) {
      const drawer = document.querySelector('.mdl-layout__drawer')
      drawer.classList.add('is-visible')
      setTimeout(function () {
        const obfuscator = document.querySelector('.mdl-layout__obfuscator')
        obfuscator.classList.add('is-visible')
      }, 100)
    }
  }

  handleSetNavigationUnsubscribe() {
    this.setState({navigationContent: 'unsubscribe'})
    this.setState({showSubscriptionForm: !this.state.showSubscriptionForm})
  }

  handleSetNavigationLayers() {
    this.setState({navigationContent: 'layers'})
    this.setState({showFeatureLayerChooser: !this.state.showFeatureLayerChooser})
  }

  handleSetSignInButton() {
    return this.props.userAuthentication === 0 ? "My Gage Alerts" : "Sign In"
  }

  render() {
    return (
      <div>
        <div>
          <Button ripple
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationLayers}>
          <Icon
              name="layers"
              className="layers"
          />
          Map Layers</Button>
          { this.state.showFeatureLayerChooser ? <FeatureLayerChooserContainer/> : '' }
        </div>
        <div>
          <Button ripple
          className="toggle-navigation-content bottom-nav-button"
          onClick={this.handleSetNavigationUnsubscribe}>
          <Icon
              name="notifications_active"
              className="add-alert"
          />
          {this.handleSetSignInButton()}</Button>
          { this.state.showSubscriptionForm ? <SubscriptionFormContainer/> : '' }
        </div>
      </div>
    )
  }
}

export default NavigationToggle
