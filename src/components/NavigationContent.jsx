import React, { Component } from 'react'
import { Button } from 'react-mdl'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import SubscriptionFormContainer from '../containers/SubscriptionFormContainer'


class NavigationToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationContent: 'layers',
      showFeatureLayerChooser: this.props.navContentInitState.showFeatureLayerChooser,
      showSubscriptionForm: this.props.navContentInitState.showSubscriptionForm
    }

    this.handleSetNavigationUnsubscribe = this.handleSetNavigationUnsubscribe.bind(this)
    this.handleSetNavigationLayers = this.handleSetNavigationLayers.bind(this)
  }

  handleSetNavigationUnsubscribe() {
    this.setState({navigationContent: 'unsubscribe'})
    this.setState({showSubscriptionForm: !this.state.showSubscriptionForm})
  }

  handleSetNavigationLayers() {
    this.setState({navigationContent: 'layers'})
    this.setState({showFeatureLayerChooser: !this.state.showFeatureLayerChooser})
  }

  render() {
    return (
      <div>
        <div>
          <Button ripple
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationLayers}>Map Layers</Button>
          { this.state.showFeatureLayerChooser ? <FeatureLayerChooserContainer/> : '' }
        </div>
        <div>
          <Button ripple
          className="toggle-navigation-content"
          onClick={this.handleSetNavigationUnsubscribe}>MY GAGE ALERTS</Button>
          { this.state.showSubscriptionForm ? <SubscriptionFormContainer/> : '' }
        </div>
      </div>
    )
  }
}

export default NavigationToggle
