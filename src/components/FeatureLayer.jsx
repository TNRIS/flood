import React from 'react'

const FeatureLayer = ({ onClick, text, icon }) => {
  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" href="">
      <div>
        <img src={icon} className="feature-layer__icon" />
        { text }
      </div>
    </a>
  )
}

export default FeatureLayer
