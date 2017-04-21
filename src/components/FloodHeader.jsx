import React from 'react'
import { Header, Navigation } from 'react-mdl'

import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent.png'
import TexasFloodIconImage from '../images/icons/favicon.ico'

class FloodHeader extends React.Component {
  static propTypes = {
  }

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
      <Header transparent style={{color: 'white'}}>
        <div className="header__title">
          <a href="http://texasflood.org" target="_blank">
            <img src={imgSource} alt="The Texas Flood dot org logo"/>
          </a>
        </div>
        <Navigation className="header__navigation">
          <a href="#"
            id="basemap-context-menu"
            title="Basemaps"><i className="material-icons">satellite</i></a>
          <BaseLayerMenuContainer />
          <a href="#"
            title="Search"
             onClick={this.handleShowGeocoder}><i className="material-icons">search</i></a>
        </Navigation>
      </Header>
    )
  }
}

export default FloodHeader
