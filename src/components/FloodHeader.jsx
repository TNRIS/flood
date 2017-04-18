import React from 'react'
import { Header, Navigation } from 'react-mdl'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent.png'


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
    const geocoderControl = document.getElementById("geocoder")
    geocoderControl.classList.toggle("showGeocoder")
  }

  toggleSidebar () {
    const layout = document.querySelector('.mdl-layout')
    // layout.MaterialLayout.toggleDrawer()
    layout.classList.toggle("mdl-layout--fixed-header")
  }

  render() {
    return (
      <Header transparent style={{color: 'white'}}>
        <div className="header__title">
          <a href="http://texasflood.org" target="_blank">
            <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo"/>
          </a>
        </div>
        <button style={{left: "300px"}} onClick={this.toggleSidebar}>TOGGLE</button>
        <Navigation className="header__navigation">
          <a href="#"
             onClick={this.handleShowGeocoder}><i className="material-icons">search</i></a>
        </Navigation>
      </Header>
    )
  }
}

export default FloodHeader
