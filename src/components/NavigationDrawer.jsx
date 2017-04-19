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

  componentDidMount() {
    setTimeout(() => {
      this.changeIcon()
    }, 0)
  }

  // This is a hack to replace the mdl-layout__drawer-button icon from
  // the chevron_right icon to the hamburger menu icon for our use.
  // This is not usually a good way to do this but as MDL has provided
  // no other way outside of editing the CSS directly .... viola...
  changeIcon() {
    const _db = document.querySelector('.mdl-layout__drawer-button i')
    if (_db) {
      _db.textContent = 'menu'
    }
  }

  render() {
    return (
      <Drawer className="nav">
        <div className="nav__head">
          {/* <div className="nav__title">
            <a href="http://texasflood.org">
              TexasFlood Information Viewer
            </a>
          </div> */}
        </div>
        <NavigationContent navContentInitState={this.props.navContentInitState} />
        <Resources />
        <div className="footer">
          <div className="footer__wrapper">
            <a className="footer__twdb-logo" href="http://www.twdb.texas.gov">
              <img src={TWDBLogoImage} alt="The Texas Water Development Board logo"/>
            </a>
            <a className="footer__tnris-logo" href="http://www.tnris.org">
              <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
            </a>
          </div>
        </div>
      </Drawer>
    )
  }
}

export default NavigationDrawer
