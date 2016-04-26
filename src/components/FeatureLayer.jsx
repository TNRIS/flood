import React from 'react'
import { Checkbox, Spinner } from 'react-mdl'

const FeatureLayer = ({ onClick, text, icon, active, status }) => {
  let statusIndicator
  if (active && status !== 'ready') {
    statusIndicator = <Spinner />
  }
  else {
    statusIndicator = <Checkbox checked={active} readOnly />
  }

  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="feature-layer__link mdl-navigation__link" style={{paddingLeft: '10px'}} href="">
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
    </a>
  )
}

export default FeatureLayer
