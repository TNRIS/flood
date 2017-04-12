import React from 'react'
import { Drawer } from 'react-mdl'

import Resources from './Resources'
import NavigationContent from './NavigationContent'

import TWDBLogoImage from '../images/logo_twdb.png'
import tnrisLogoImage from '../images/tnris_white_transparent_bg.gif'

class  NavigationDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Drawer className="nav">
        <NavigationContent />
        <Resources />
        <div className="footer">
          <div className="footer__wrapper">
          <a className="footer__tnris-logo" href="http://www.tnris.org">
            <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
          </a>
            <a className="footer__twdb-logo" href="http://www.twdb.texas.gov">
              <img src={TWDBLogoImage} alt="The Texas Water Development Board logo"/>
            </a>
          </div>
        </div>
      </Drawer>
    )
  }
}

export default NavigationDrawer
