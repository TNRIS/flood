import React, { Component } from 'react'
import { Button, Icon } from 'react-mdl'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import SubscriptionFormContainer from '../containers/SubscriptionFormContainer'


class NavigationToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {navigationContent: 'layers'}
    this.handleSetNavigationUnsubscribe = this.handleSetNavigationUnsubscribe.bind(this)
    this.handleSetNavigationLayers = this.handleSetNavigationLayers.bind(this)
  }

  handleSetNavigationUnsubscribe() {
    this.setState({navigationContent: 'unsubscribe'})
  }

  handleSetNavigationLayers() {
    this.setState({navigationContent: 'layers'})
  }

  render() {
    const navigationContent = this.state.navigationContent
    let content

    if (navigationContent === 'layers') {
      content = (
        <div>
          <h2><i className="material-icons">layers</i> Map Layers</h2>
          <FeatureLayerChooserContainer/>
          <Button ripple
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationUnsubscribe}><i className="material-icons">add_alert</i> Manage Alerts</Button>
        </div>
      )
    }
    else {
      content = (
        <div>
          <h2><i className="material-icons">add_alert</i> Manage Alerts</h2>
          <SubscriptionFormContainer/>
          <Button ripple
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationLayers}><i className="material-icons">layers</i> Map Layers</Button>
        </div>
      )
    }

    return (
      content
    )
  }
}

export default NavigationToggle
