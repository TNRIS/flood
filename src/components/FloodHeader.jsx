import React from 'react'
import {Provider} from 'react-redux'

import BaseLayerMenuContainer from '../containers/BaseLayerMenuContainer'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent_300x42.png'
import TexasFloodIconImage from '../images/icons/favicon.ico'
import {storeGeoJson} from '../actions/MapActions'
import { centerOfMass } from "@turf/turf";
import L from 'leaflet'
import 'regenerator-runtime/runtime'

import { store } from "../store"

const uploadStyle = {
  "opacity": 0, 
  "position": 'absolute', 
  "zIndex": -1
}

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

  async handleCustomOverlay() {
    let geoJson = document.getElementById('upload-geoJson').files[0]
    let reader = new FileReader
    reader.readAsBinaryString(geoJson)
    reader.onload = () => {
      try {
        // Validate the input
        L.geoJSON(JSON.parse(reader.result))
        let center = centerOfMass(JSON.parse(reader.result));
        localStorage.setItem('flyToCoordinates', JSON.stringify(center.geometry.coordinates)) 
      }
      catch(err) {
        alert("The input is not valid geoJSON")
        return
      }
      store.dispatch(storeGeoJson(reader.result))
      document.getElementById('custom-overlay').style.display = 'block'
    }
  }

  render() {
    const imgSource = this.props.browser.width < 350 ? TexasFloodIconImage : TexasFloodLogoImage
    this.currentStore = store.getState()

    return (
      <div className="title-bar">
        <Provider store={store}>
          <button type="button" className="button" data-toggle="off-canvas-drawer">
            <i className="fi-list"></i>
          </button>
          <div className="title-logo">
            <a href="http://texasflood.org" target="_blank">
              <img src={imgSource} alt="The Texas Flood dot org logo"/>
            </a>
          </div>
          <label className="button custom-overlay-button" htmlFor="upload-geoJson"><i className="fi-upload"></i></label>
            <input type="file" title="Custom Overlay button" id="upload-geoJson" name="custom-geoJson" onChange={this.handleCustomOverlay} style={uploadStyle}></input>
          <button className="button basemap-button" type="button" data-toggle="basemap-dropdown">
            <a href="#"
              id="basemap-context-menu"
              title="Basemaps"><i className="fi-photo"></i></a>
          </button>
          <div className="dropdown-pane"
              data-position="bottom"
              data-alignment="center"
              data-close-on-click="true"
              data-dropdown
              id="basemap-dropdown">
            <BaseLayerMenuContainer />
          </div>
          <button className="button" type="button" onClick={this.handleShowGeocoder}>
            <a href="#"
              title="Search"><i className="fi-magnifying-glass"></i>
            </a>
          </button>
        </Provider>
      </div>
    )
  }
}

export default FloodHeader
