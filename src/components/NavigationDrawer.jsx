import React from 'react'

import $ from 'jquery'

import NavigationContent from './NavigationContent'

import TWDBLogoImage from '../images/logo_twdb.png'
import tnrisLogoImage from '../images/tnris_white_transparent_bg.gif'

class  NavigationDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    $('.js-off-canvas-overlay').removeClass('is-visible').removeClass('is-closable')
  }

  render() {
    return (
      <div className="nav">
        <NavigationContent
          navContentInitState={this.props.navContentInitState}
          browser={this.props.browser}
          userAuthentication={this.props.userAuthentication}
        />
      </div>
    )
  }
}

export default NavigationDrawer
