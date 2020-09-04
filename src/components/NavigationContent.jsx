import React, { Component } from 'react'

// import { Timeline, Follow } from 'react-twitter-widgets'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import SubscriptionFormContainer from '../containers/SubscriptionFormContainer'

class NavigationToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationContent: 'layers',
      showFeatureLayerChooser: this.props.navContentInitState.showFeatureLayerChooser,
      showSubscriptionForm: this.props.navContentInitState.showSubscriptionForm,
      showTwitterFeed: this.props.navContentInitState.showTwitterFeed,
      userAuthentication: this.props.userAuthentication
    }

    this.handleSetNavigationUnsubscribe = this.handleSetNavigationUnsubscribe.bind(this)
    this.handleSetNavigationLayers = this.handleSetNavigationLayers.bind(this)
    this.handleSetNavigationTwitterFeed = this.handleSetNavigationTwitterFeed.bind(this)
    this.handleSetSignInButton = this.handleSetSignInButton.bind(this)
  }

  handleSetNavigationUnsubscribe() {
    this.setState({navigationContent: 'unsubscribe'})
    this.setState({showSubscriptionForm: !this.state.showSubscriptionForm})
  }

  handleSetNavigationLayers() {
    this.setState({navigationContent: 'layers'})
    this.setState({showFeatureLayerChooser: !this.state.showFeatureLayerChooser})
  }

  handleSetNavigationTwitterFeed() {
    this.setState({navigationContent: 'twitter'})
    this.setState({showTwitterFeed: !this.state.showTwitterFeed})
  }

  handleSetSignInButton() {
    return this.props.userAuthentication === 0 ? "My Gage Alerts" : "Sign In"
  }

  handleSetSignInButtonIcon() {
    return this.props.userAuthentication === 0 ? "fa fa-bell-o" : "fa fa-pencil"
  }

  render() {
    // const twitterFeed = (
    //   <div>
    //     <div className="twitter-feed">
    //       <Timeline
    //         dataSource={{
    //           sourceType: 'profile',
    //           screenName: 'TexasFloodOrg'
    //         }}
    //         options={{
    //           username: 'TexasFloodOrg',
    //           height: '400',
    //           tweetLimit: '10',
    //           chrome: ['nofooter'],
    //           borderColor: '#AED480',
    //           linkColor: '#1779ba'
    //         }}
    //       />
    //     </div>
    //     <div className="follow-button">
    //       <Follow
    //         username="TexasFloodOrg"
    //         options={{count: 'none', size: 'large'}}
    //       />
    //     </div>
    //   </div>
    // )
    return (
      <div className="navigation-content">
        <div>
          <button
            className="button toggle-navigation-content"
            type="button"
            onClick={this.handleSetNavigationLayers}>
            <i className="fa fa-map-o"></i>
            Map Layers
          </button>
          { this.state.showFeatureLayerChooser ? <FeatureLayerChooserContainer/> : '' }
        </div>
        <div>
          <button
          className="button toggle-navigation-content"
          type="button"
          onClick={this.handleSetNavigationUnsubscribe}>
          <i className={this.handleSetSignInButtonIcon()}></i>
          {this.handleSetSignInButton()}</button>
          { this.state.showSubscriptionForm ? <SubscriptionFormContainer/> : '' }
        </div>
        {/*<div className="twitter-content">
          <button
            className="button toggle-navigation-content bottom-nav-button"
            type="button"
            onClick={this.handleSetNavigationTwitterFeed}>
            <i className="fa fa-twitter"></i>
            Latest Gage Activity
          </button>
          { this.state.showTwitterFeed ? twitterFeed : '' }
        </div>*/}
      </div>
    )
  }
}

export default NavigationToggle
