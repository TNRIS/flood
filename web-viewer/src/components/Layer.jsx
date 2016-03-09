import React from 'react'

const Layer = ({ onClick, text }) => {
  return (
    <a onClick={onClick} className="mdl-navigation__link" href="">{ text }</a>
  )
}

export default Layer
