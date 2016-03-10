import React from 'react'

const BaseLayer = ({ onClick, text }) => {
  return (
    <a onClick={(e) => {e.preventDefault(); onClick()}} className="mdl-navigation__link" href="">{ text }</a>
  )
}

export default BaseLayer
