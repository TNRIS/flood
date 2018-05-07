import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'
import 'foundation-sites'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import NavigationDrawerMobile from '../components/NavigationDrawerMobile'
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
    // Opens the off-canvas menu on page load for desktop
    if (window.innerWidth > 1024) {
      $(document).foundation()
      $('#off-canvas-drawer').foundation('open')
      $('.js-off-canvas-overlay').removeClass('is-visible').removeClass('is-closable')
    }

    // Necessary to have the off-canvas menu functional on mobile
    if (window.innerWidth <= 1024) {
      $(document).foundation()
      $('#off-canvas-drawer').foundation('close')
    }

    // Opens the off-canvas menu focused on subscriptions when they come in from a subscription url
    if (this.props.location.pathname === '/subscriptions' && this.props.browser.lessThan.large) {
      $(document).foundation()
      $('#off-canvas-drawer').foundation('open')
    }

    // Beta warning
    if (SITE_URL != 'map.texasflood.org') {
      this.props.showSnackbar(<p><strong>Notice: </strong>This application is currently in beta.
        For the official version, visit <a href="http://map.texasflood.org">http://map.texasflood.org</a>
      </p>, 10000)
    }
  }

  componentDidUpdate() {
    // Opens the off-canvas menu on page load for desktop
    if (window.innerWidth > 1024) {
      $(document).foundation()
      $('#off-canvas-drawer').foundation('open')
      $('.js-off-canvas-overlay').removeClass('is-visible').removeClass('is-closable')
    }
  }

  render() {
    // Hides and reveals the twitter widgets when the NavigationDrawer opens or closes
    $(document).on("closed.zf.offcanvas", () => {
      $("iframe").addClass("hidden-twitter")
      $(".weather-timestamp").removeClass("weather-timestamp-menu-open")
      $(".animate-radar").removeClass("animate-radar-menu-open")
    })
    $(document).on("opened.zf.offcanvas", () => {
      $("iframe").removeClass("hidden-twitter")
      $(".weather-timestamp").addClass("weather-timestamp-menu-open")
      $(".animate-radar").addClass("animate-radar-menu-open")
    })

    const navContentInitState = () => {
      if (this.props.location.pathname === '/subscriptions') {
        return {
          showFeatureLayerChooser: false,
          showSubscriptionForm: true,
          showTwitterFeed: false
        }
      }
      return {
        showFeatureLayerChooser: true,
        showSubscriptionForm: false,
        showTwitterFeed: false
      }
    }
    
    let sideBar
    if (window.innerWidth > 1024) {
      sideBar = (
        <div className="app-content">
          <div id="off-canvas-drawer"
               className="on-canvas off-canvas position-left"
               data-transition="overlap"
               data-off-canvas>
              <NavigationDrawer
                navContentInitState={navContentInitState()}
                browser={this.props.browser}
                userAuthentication={this.props.userAuthentication}
              />
          </div>
          <div className="off-canvas-content desktop-overlay" data-off-canvas-content>
            <MapContainer />
          </div>
        </div>
      )
    } else {
      sideBar = (
        <div className="app-content">
          <div id="off-canvas-drawer"
               className="off-canvas position-left is-closed"
               data-transition="overlap"
               data-off-canvas>
              <NavigationDrawerMobile
                navContentInitState={navContentInitState()}
                browser={this.props.browser}
                userAuthentication={this.props.userAuthentication}
              />
          </div>
          <div className="off-canvas-content" data-off-canvas-content>
            <MapContainer />
          </div>
      </div>
      )
    }

    return (
      <div>
        <Disclaimer />
        <AboutContainer />
        <FloodHeaderContainer navContentInitState={navContentInitState()}/>
        { sideBar }
        <FloodFooter browser={this.props.browser} />
        <ToasterContainer />
      </div>
    )
  }
}
