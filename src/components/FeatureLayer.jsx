import React from 'react'
import { Checkbox } from 'react-mdl'

const FeatureLayer = ({ onClick, text, icon, active }) => {
  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" style={{paddingLeft: '10px'}} href="">
      <div className="feature-layer__wrapper">
        <span className="feature-layer__icon-wrapper">
          <img src={icon} className="feature-layer__icon" />
        </span>
        { text }
        <span className="feature-layer__checkbox">
          <Checkbox checked={active} readOnly />
        </span>
      </div>
    </a>
  )
}

export default FeatureLayer
