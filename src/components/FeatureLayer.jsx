import React, { Component, PropTypes } from 'react'
import { Checkbox, Spinner } from 'react-mdl'


export default class FeatureLayer extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.array,
    icon: PropTypes.string,
    legend: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  }

  render() {
    const { onClick, text, icon, legend, active, status } = this.props

    let statusIndicator
    if (active && status !== 'ready') {
      statusIndicator = <Spinner />
    }
    else {
      statusIndicator = <Checkbox checked={active} readOnly />
    }

    let legendElement
    if (active && legend) {
      legendElement = (
        <div className="feature-layer__legend">
          <img src={legend} />
        </div>
      )
    }

    return (
      <a onClick={(e) => {e.preventDefault(); onClick()}} className="feature-layer__link mdl-navigation__link" href="">
        <div className="feature-layer__wrapper">
          <div className="feature-layer__icon-wrapper">
            <img src={icon} className="feature-layer__icon" />
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
    )
  }
}
