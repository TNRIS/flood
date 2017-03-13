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
          <FeatureLayerChooserContainer/>
          <Button raised
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationUnsubscribe}>Manage Subscriptions</Button>
        </div>
      )
    }
    else {
      content = (
        <div>
          <SubscriptionFormContainer/>
          <Button raised 
          className="toggle-navigation-content"
          style={{borderTop: "1px solid rgb(44, 136, 169)"}}
          onClick={this.handleSetNavigationLayers}>View Layers</Button>
        </div>
      )
    }

    return (
      content
    )
  }
}

export default NavigationToggle
