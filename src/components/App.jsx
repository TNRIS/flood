import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'
import 'foundation-sites'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import AboutContainer from '../containers/AboutContainer'
import ToasterContainer from '../containers/ToasterContainer'
import FloodHeaderContainer from '../containers/FloodHeaderContainer'
import FloodFooter from './FloodFooter'

ga.pageview(window.location.pathname)

export default class App extends Component {
  static propTypes = {
    showSnackbar: PropTypes.func,
    location: PropTypes.object,
    browser: PropTypes.object,
    userAuthentication: PropTypes.number,
    params: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.props.retrieveUser()
  }

  componentDidMount() {
      $(document).foundation()
      if (this.props.location.pathname === '/subscriptions' && this.props.browser.width < 1025) {
        $('#off-canvas-drawer').foundation('open')
      }

      if (SITE_URL != 'map.texasflood.org') {
        this.props.showSnackbar(<p><strong>Notice: </strong>This application is currently in beta. All user subscriptions
        from previous versions of this application have expired. You will need to sign up for an account and resubscribe to
        gages of interest. For the official version, visit <a href="http://map.texasflood.org">http://map.texasflood.org</a>
        </p>, 10000)
      }
  }

  render() {
    const navContentInitState = () => {
      if (this.props.location.pathname === '/subscriptions') {
        return {
          showFeatureLayerChooser: false,
          showSubscriptionForm: true
        }
      }
      return {
        showFeatureLayerChooser: true,
        showSubscriptionForm: false
      }
    }

    let sideBar
    if (this.props.browser.greaterThan.large) {
      sideBar = (
        <div id="off-canvas-drawer"
             className="on-canvas">
            <NavigationDrawer
              navContentInitState={navContentInitState()}
              browser={this.props.browser}
              userAuthentication={this.props.userAuthentication}
            />
        </div>
      )
    } else {
      sideBar = (
        <div id="off-canvas-drawer"
             className="off-canvas position-left"
             data-transition="overlap"
             data-off-canvas>
            <NavigationDrawer
              navContentInitState={navContentInitState()}
              browser={this.props.browser}
              userAuthentication={this.props.userAuthentication}
            />
        </div>
      )
    }

    return (
      <div>
        <Disclaimer />
        <AboutContainer />
        <FloodHeaderContainer />
        <div className="app-content">
          { sideBar }
          <div className="off-canvas-content" data-off-canvas-content>
            <MapContainer />
          </div>
        </div>
        <FloodFooter browser={this.props.browser} />
        <ToasterContainer />
      </div>
    )
  }
}
