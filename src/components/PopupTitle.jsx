import React from 'react'

const PopupTitle = ({ icon, title }) => {
  return (
    <div className="popup__title">
      <img src={ icon } className="popup__icon" />
      <span className="popup__title-text">
        { title }
      </span>
    </div>
  )
}

export default PopupTitle
