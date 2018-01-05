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
      statusIndicator = <RingLoader color={'#92C553'} loading=true />
    }
    else {
      statusIndicator = <div class="switch"><input class="switch-input" type="checkbox" checked={active}></div>
    }

    let legendElement
    if (active && legend && text != "Weather Alerts") {
      legendElement = (
        <div className="feature-layer__legend">
          <img src={legend} />
        </div>
      )
    }
    let legendLink
    if (active && legend && text == "Weather Alerts") {
      legendLink = (
        <div className="feature-layer__legendLink">
          <a href="./flood-alert-legend.png" target="weather-alerts-legend">NOAA Advisories</a>
        </div>
      )
    }

    return (
      <li>
        <div className="feature-layer__link">
          <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" href="">
            <div className="feature-layer__wrapper">
              <div className="feature-layer__icon-wrapper">
                <img src={icon} alt={altText} className="feature-layer__icon" />
              </div>
              <div className="feature-layer__name vertically-centered__wrapper">
                <div className="vertically-centered__element">
                  { text }
                </div>
              </div>
              <div className="feature-layer__checkbox">
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
