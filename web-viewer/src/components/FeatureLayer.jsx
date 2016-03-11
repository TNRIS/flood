import React from 'react'

const FeatureLayer = ({ onClick, text }) => {
  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" href="">{ text }</a>
  )
}

export default FeatureLayer
