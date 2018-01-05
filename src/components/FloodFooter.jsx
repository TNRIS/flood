import React from 'react'
import ReactDOM from 'react-dom'


import AboutLinkContainer from '../containers/AboutLinkContainer'
import ContactLink from './ContactLink'

import TWDBLogoImage from '../images/logo_twdb_300x83.png'
import tnrisLogoImage from '../images/tnris_white_transparent_300x166.gif'

class FloodFooter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {fullscreenIcon: "fullscreen"}
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.handleShowFullscreenToggle = this.handleShowFullscreenToggle.bind(this)
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

  handleShowFullscreenToggle() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const fullscreenButtonClass = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream ?
      "hideFullscreenButton" : "fullscreenButton"
    return fullscreenButtonClass
  }

  render() {
    const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION
    return (
      <div className="footer__bar">
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
        <div className="footer__bar-section">
          <div className="footer__bar-links">
            <button className="button" type="button"  data-toggle="resources-dropdown-top-left">Resources</button>
            <div className="dropdown-pane footer-context-menu"
                 id="resources-dropdown-top-left"
                 data-position="top"
                 data-alignment="left"
                 data-dropdown data-auto-focus="true">
              <ul className="vertical menu">
                <li className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/before.asp" target="_blank">Preparing Before a Flood</a></li>
                <li className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/during.asp" target="_blank">Being Safe During a Flood</a></li>
                <li className="footer-context-menu-item"><a href="http://www.twdb.texas.gov/flood/prep/after.asp" target="_blank">Recovering After a Flood</a></li>
              </ul>
            </div>
            <AboutLinkContainer />
            <ContactLink text="Contact"
                          href={contactLink}
                          target="_top" />
          </div>
        </div>
        <a href="#"
          title="Fullscreen"
          className={this.handleShowFullscreenToggle()}
          onClick={this.toggleFullscreen}>
          <i className="material-icons">{this.state.fullscreenIcon}</i>
        </a>
      </div>
    )
  }
}

export default FloodFooter
