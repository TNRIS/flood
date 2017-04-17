import React from 'react'
import ReactDOM from 'react-dom'
import { Footer, FooterSection, FooterLinkList, IconButton, Menu, MenuItem } from 'react-mdl'

import AboutLinkContainer from '../containers/AboutLinkContainer'
import ContactLink from './ContactLink'

class FloodFooter extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
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
    } else {
      const req = element.requestFullScreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
      req.call(element)
    }
  }

  render() {
    const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION
    return (
      <Footer size="mini">
        <FooterSection>
          <FooterLinkList>
            <div style={{position: 'relative'}}>
              <a href="#" name="more_vert" id="footer-context-menu">Resources</a>
              <Menu className="footer-context-menu" target="footer-context-menu" valign="top" align="left" ripple>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/before.asp" target="_blank">before a flood</a></MenuItem>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/during.asp" target="_blank">during a flood</a></MenuItem>
                <MenuItem className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/after.asp" target="_blank">after a flood</a></MenuItem>
              </Menu>
            </div>
            <AboutLinkContainer />
            <ContactLink text="Contact"
                          href={contactLink}
                          target="_top" />
            <a href="#" onClick={this.toggleFullscreen}>Fullscreen</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    )
  }
}

export default FloodFooter
