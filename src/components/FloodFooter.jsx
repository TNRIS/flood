import React from 'react'
import ReactDOM from 'react-dom'


import AboutLinkContainer from '../containers/AboutLinkContainer'
import ContactLink from './ContactLink'

import TWDBLogoImage from '../images/logo_twdb_300x83.png'
import tnrisLogoImage from '../images/tnris_white_transparent_300x166.gif'

class FloodFooter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {fullscreenIcon: "fi-arrows-out"}
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.handleShowFullscreenToggle = this.handleShowFullscreenToggle.bind(this)
    this.watchFullscreen = this.watchFullscreen.bind(this)
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

  watchFullscreen () {
    if (document.fullscreenEnabled ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenEnabled) {
          this.setState({fullscreenIcon: "fi-arrows-in"})
    } else {
      this.setState({fullscreenIcon: "fi-arrows-out"})
    }
  }

  componentDidMount () {
    const element = document.getElementsByTagName("html")[0]
    element.addEventListener('webkitfullscreenchange', this.watchFullscreen, false)
    element.addEventListener('mozfullscreenchange', this.watchFullscreen, false)
    element.addEventListener('fullscreenchange', this.watchFullscreen, false)
    element.addEventListener('MSFullscreenChange', this.watchFullscreen, false)
  }

  handleShowFullscreenToggle() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const fullscreenButtonClass = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream ?
      "hideFullscreenButton" : "fullscreenButton"
    return fullscreenButtonClass
  }

  render() {
    const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION

    let footerLogoClass = "footer-logos"
    if (this.props.browser.lessThan.large || this.props.browser.is.large) {
      footerLogoClass = "footer-logos mobile"
    }

    return (
      <div className="footer-bar">
        <div className={footerLogoClass}>
          <div className="footer-wrapper">
            <a className="footer-twdb-logo" href="http://www.twdb.texas.gov" target="_blank">
              <img src={TWDBLogoImage} alt="The Texas Water Development Board logo"/>
            </a>
            <a className="footer-tnris-logo" href="http://www.tnris.org" target="_blank">
              <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
            </a>
          </div>
        </div>
        <div className="footer-bar-section">
          <div className="footer-bar-links">
            <button className="button" type="button"  data-toggle="resources-dropdown-top-left">Resources</button>
            <div className="dropdown-pane footer-context-menu"
                 id="resources-dropdown-top-left"
                 data-position="top"
                 data-alignment="center"
                 data-close-on-click="true"
                 data-dropdown>
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
          title="Toggle Fullscreen"
          className={this.handleShowFullscreenToggle()}
          onClick={this.toggleFullscreen}>
          <i className={this.state.fullscreenIcon}></i>
        </a>
      </div>
    )
  }
}

export default FloodFooter
