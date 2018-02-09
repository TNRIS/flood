import React from 'react'

import NavigationContent from './NavigationContent'

import TWDBLogoImage from '../images/logo_twdb.png'
import tnrisLogoImage from '../images/tnris_white_transparent_bg.gif'

class  NavigationDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="nav">
        <NavigationContent
          navContentInitState={this.props.navContentInitState}
          browser={this.props.browser}
          userAuthentication={this.props.userAuthentication}
        />
        <div className="nav-footer">
          <div className="footer-wrapper">
            <a className="footer-twdb-logo" href="http://www.twdb.texas.gov">
              <img src={TWDBLogoImage} alt="The Texas Water Development Board logo"/>
            </a>
            <a className="footer-tnris-logo" href="http://www.tnris.org">
              <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NavigationDrawer
