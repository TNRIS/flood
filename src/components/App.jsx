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
    $(document).foundation();

    if (SITE_URL != 'map.texasflood.org') {
      this.props.showSnackbar(<p><strong>Notice: </strong>This application is currently in beta. All user subscriptions
      from previous versions of this application have expired. You will need to sign up for an account and resubscribe to
      gages of interest. For the official version, visit <a href="http://map.texasflood.org">http://map.texasflood.org</a>
      </p>, 5000)
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

    return (
      <div>
        <Disclaimer />
        <AboutContainer />
        <FloodHeaderContainer />
        <div className="off-canvas reveal-for-medium" data-off-canvas>
          <NavigationDrawer
            navContentInitState={navContentInitState()}
            browser={this.props.browser}
            userAuthentication={this.props.userAuthentication}
          />
        </div>
        <div>
          <MapContainer
            initialCenter={{
              lat: this.props.params.lat || null,
              lng: this.props.params.lng || null,
              zoom: this.props.params.zoom || null
            }}
            gageCenter={{
              lid: this.props.params.lid || null
            }} />
        </div>
        <FloodFooter />
        <ToasterContainer />
      </div>
    )
  }
}
