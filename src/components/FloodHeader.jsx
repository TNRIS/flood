import React from 'react'

import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent_300x42.png'
import TexasFloodIconImage from '../images/icons/favicon.ico'

class FloodHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showTwitterFeed: this.props.navContentInitState.showTwitterFeed
    }
    this.handleShowGeocoder = this.handleShowGeocoder.bind(this)
  }

  handleShowGeocoder() {
    const geocoderControl = document.querySelector(".leaflet-control-geocoder")
    geocoderControl.classList.toggle("showGeocoder")
  }

  render() {
    const imgSource = this.props.browser.width < 350 ? TexasFloodIconImage : TexasFloodLogoImage

    return (
      <div className="title-bar">
        <button type="button" className="button" data-toggle="off-canvas-drawer">
          <i className="fi-list"></i>
        </button>
        <div className="title-logo">
          <a href="http://texasflood.org" target="_blank">
            <img src={imgSource} alt="The Texas Flood dot org logo"/>
          </a>
        </div>
        <button className="button basemap-button" type="button" data-toggle="basemap-dropdown">
          <a href="#"
            id="basemap-context-menu"
            title="Basemaps"><i className="fi-photo"></i></a>
        </button>
        <div className="dropdown-pane"
             data-position="bottom"
             data-alignment="right"
             data-dropdown
             id="basemap-dropdown">
          <BaseLayerMenuContainer />
        </div>
        <button className="button" type="button" onClick={this.handleShowGeocoder}>
          <a href="#"
             title="Search"><i className="fi-magnifying-glass"></i>
          </a>
        </button>
      </div>
    )
  }
}

export default FloodHeader
