import React from 'react'

const Layer = ({ onClick, text }) => {
  return (
    <div onClick={onClick} className="mdl-navigation__link" href="">{ text }</div>
  )
}

export default Layer
