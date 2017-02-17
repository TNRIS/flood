import React, { Component } from 'react'
import { Button } from 'react-mdl'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import SubscriptionsContainer from '../containers/SubscriptionsContainer'


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
          <FeatureLayerChooserContainer/>
          <Button raised className="toggle-navigation-content" onClick={this.handleSetNavigationUnsubscribe}>Manage Subscriptions</Button>
        </div>
      )
    }
    else {
      content = (
        <div>
          <SubscriptionsContainer/>
          <Button raised className="toggle-navigation-content" onClick={this.handleSetNavigationLayers}>View Layers</Button>
        </div>
      )
    }

    return (
      content
    )
  }
}

export default NavigationToggle
