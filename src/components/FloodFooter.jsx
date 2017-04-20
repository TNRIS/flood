import React from 'react'
import ReactDOM from 'react-dom'
import { Footer, FooterSection, FooterLinkList, IconButton, Menu, MenuItem } from 'react-mdl'

import AboutLinkContainer from '../containers/AboutLinkContainer'
import ContactLink from './ContactLink'
import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

import TWDBLogoImage from '../images/logo_twdb.png'
import tnrisLogoImage from '../images/tnris_white_transparent_bg.gif'

class FloodFooter extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {fullscreenIcon: "fullscreen"}
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }

  toggleFullscreen() {
    const element = document.getElementsByTagName("html")[0]
    if (document.fullscreenEnabled ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenEnabled) {
      const req = document.exitFullScreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      req.call(document)
      this.setState({fullscreenIcon: "fullscreen"})
    } else {
      const req = element.requestFullScreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
      req.call(element)
      this.setState({fullscreenIcon: "fullscreen_exit"})
    }
  }

  render() {
    const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION
    return (
      <Footer size="mini">
        <div className="footer__logos">
          <div className="footer__wrapper">
            <a className="footer__twdb-logo" href="http://www.twdb.texas.gov">
              <img src={TWDBLogoImage} alt="The Texas Water Development Board logo"/>
            </a>
            <a className="footer__tnris-logo" href="http://www.tnris.org">
              <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
            </a>
          </div>
        </div>
        <a href="#"
          id="basemap-context-menu"
          title="Basemaps"><i className="material-icons">satellite</i></a>
        <BaseLayerMenuContainer />
        <FooterSection>
          <FooterLinkList>
            <div style={{position: 'relative'}}>
              <a href="#" name="more_vert" id="footer-context-menu">Resources</a>
              <Menu className="footer-context-menu" target="footer-context-menu" valign="top" align="left" ripple>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/before.asp" target="_blank">Preparing Before a Flood</a></MenuItem>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/during.asp" target="_blank">Being Safe During a Flood</a></MenuItem>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/after.asp" target="_blank">Recovering After a Flood</a></MenuItem>
              </Menu>
            </div>
            <AboutLinkContainer />
            <ContactLink text="Contact"
                          href={contactLink}
                          target="_top" />
          </FooterLinkList>
        </FooterSection>
        <a href="#"
          title="Fullscreen"
          className="fullscreenButton"
          onClick={this.toggleFullscreen}>
          <i className="material-icons">{this.state.fullscreenIcon}</i>
        </a>
      </Footer>
    )
  }
}

export default FloodFooter
