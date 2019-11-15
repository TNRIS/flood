import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RingLoader } from 'react-spinners'


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

  render() {
    const { onClick, text, icon, altText, legend, active, status } = this.props

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
          <a href="./assets/flood-alert-legend.png" target="weather-alerts-legend">NOAA Advisories</a>
        </div>
      )
    }

    return (
      <li>
        <div className="feature-layer-link">
          <a onClick={(e) => {e.preventDefault(); onClick()}} className="feature-layer-link-clicker" href="">
            <div className="feature-layer-wrapper">
              <div className="feature-layer-icon-wrapper">
                <img src={icon} alt={altText} className="feature-layer-icon" />
              </div>
              <div className="feature-layer-name">
                { text }
              </div>
              <div className="feature-layer-switch">
                { statusIndicator }
              </div>
            </div>

            { legendElement }
          </a>
            { legendLink }
        </div>
      </li>
    )
  }
}
