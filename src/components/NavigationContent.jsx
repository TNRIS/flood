import React, { Component } from 'react'


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
          <button
          className="button toggle-navigation-content"
          type="button"
          onClick={this.handleSetNavigationLayers}>
          <i class="material-icons" name="layers">layers</i>
          Map Layers</button>
          { this.state.showFeatureLayerChooser ? <FeatureLayerChooserContainer/> : '' }
        </div>
        <div>
          <button
          className="button toggle-navigation-content bottom-nav-button"
          type="button"
          onClick={this.handleSetNavigationUnsubscribe}>
          <i class="material-icons" name="notifications_active">add-alert</i>
          {this.handleSetSignInButton()}</button>
          { this.state.showSubscriptionForm ? <SubscriptionFormContainer/> : '' }
        </div>
      </div>
    )
  }
}

export default NavigationToggle
