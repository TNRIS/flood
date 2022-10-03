import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RingLoader } from 'react-spinners'
import { store } from '../store'
import searchIcon from '../images/icons/search.png'

export default class FeatureLayer extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.array,
    icon: PropTypes.string,
    altText: PropTypes.string,
    legend: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  }

  zoomToLayer(e) {
    let currentStore = store.getState()
    let coordinates = localStorage.getItem('flyToCoordinates')
    currentStore.LeafletMap.mapObject.flyTo(JSON.parse(coordinates).reverse())
  }

  render() {
    const { onClick, text, icon, altText, legend, active, status, options, id } = this.props

    let statusIndicator
    if (active && status !== 'ready') {
      statusIndicator = <RingLoader size={30} color={'#92C553'} loading={true} />
    }
    else {
      statusIndicator = (
        <div className="switch tiny">
          <input className="switch-input"
            id="layerSwitch"
            type="checkbox"
            name="layerSwitch"
            checked={active}
            readOnly/>
          <label className="switch-paddle" htmlFor="layerSwitch">
            <span className="show-for-sr"></span>
          </label>
        </div>
      )
    }

    let legendElement
    if (active && legend && text != "Weather Alerts") {
      legendElement = text == "Weather Radar" ? (
        <div className="feature-layer-legend-weather-radar">
          <img src={legend} />
        </div>
      ) : (
        <div className="feature-layer-legend">
          <img src={legend} />
        </div>
      )
    }
    let legendLink
    if (active && legend && text == "Weather Alerts") {
      legendLink = (
        <div className="feature-layer-legendLink">
          <a href={legend} target="weather-alerts-legend">NOAA Advisories</a>
        </div>
      )
    }
    const featLinkStyle = {
      display: options.hidden ? 'none': 'block'
    }
    return (
      <li>
        <div className="feature-layer-link" style={featLinkStyle} id={id}>
            <div className="feature-layer-wrapper">
              <div className="feature-layer-icon-wrapper">
                <img src={icon} alt={altText} className="feature-layer-icon" />
              </div>
              <div className="feature-layer-name">
                { text } { [text == 'Custom Overlay' ? <button class="zoomButton" onClick={(e) => {this.zoomToLayer(e)}}><img src={searchIcon} style={{width: "16px", height: "16px"}}></img></button>: '', legendLink] }

              </div>
              <a onClick={(e) => {e.preventDefault(); onClick()}} className="feature-layer-link-clicker" href="">
                <div className="feature-layer-switch">
                  { statusIndicator }
                </div>
              </a>

            </div>
            
            { legendElement }
        </div>
      </li>
    )
  }
}
