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
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" style={{paddingLeft: '10px'}} href="">
      <div className="feature-layer__wrapper">
        <span className="feature-layer__icon-wrapper">
          <img src={icon} className="feature-layer__icon" />
        </span>
        { text }
        <span className="feature-layer__checkbox">
          { statusIndicator }
        </span>
      </div>
    </a>
  )
}

export default FeatureLayer
