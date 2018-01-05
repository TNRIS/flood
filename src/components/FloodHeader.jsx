import React from 'react'


import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent_300x42.png'
import TexasFloodIconImage from '../images/icons/favicon.ico'

class FloodHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.changeIcon = this.changeIcon.bind(this)
    this.handleShowGeocoder = this.handleShowGeocoder.bind(this)
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

  handleShowGeocoder() {
    const geocoderControl = document.querySelector(".leaflet-control-geocoder")
    geocoderControl.classList.toggle("showGeocoder")
  }

  render() {
    const imgSource = this.props.browser.width < 350 ? TexasFloodIconImage : TexasFloodLogoImage
    return (
      <div className="title-bar" style={{color: 'white'}}>
        <div class="title-bar-left">
          <button class="menu-icon" type="button" data-open="offCanvasLeft"></button>
          <span class="title-bar-title">Foundation</span>
        </div>
        <div className="header__title">
          <a href="http://texasflood.org" target="_blank">
            <img src={imgSource} alt="The Texas Flood dot org logo"/>
          </a>
        </div>
        <button className="button header__navigation" type="button" data-toggle="example-dropdown-bottom-right">
          <a href="#"
            id="basemap-context-menu"
            title="Basemaps"><i className="material-icons">satellite</i></a>
        </button>
        <div class="dropdown-pane" data-position="bottom" data-alignment="right" id="basemap-dropdown" data-dropdown data-auto-focus="true">
          <BaseLayerMenuContainer />
        </div>
        <a href="#"
          title="Search"
           onClick={this.handleShowGeocoder}><i className="material-icons">search</i>
        </a>

      </div>
    )
  }
}

export default FloodHeader
