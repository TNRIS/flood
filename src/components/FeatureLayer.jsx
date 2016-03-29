import React from 'react'

const FeatureLayer = ({ onClick, text, icon }) => {
  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" style={{paddingLeft: '10px'}} href="">
      <div className="feature-layer__wrapper">
        <span className="feature-layer__icon-wrapper">
          <img src={icon} className="feature-layer__icon" />
        </span>
        { text }
      </div>
    </a>
  )
}

export default FeatureLayer
