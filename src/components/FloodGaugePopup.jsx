import React, { PropTypes } from 'react'

export const FloodGaugePopup = ({ lid, name, hydrograph_image, onImageLoad, maxWidth }) => {
  const style = {
    maxWidth: `${maxWidth}px !important`
  }
  return (
    <div>
      <div className="popup__title">
        Flood Gauge Information!!
      </div>
      <div className="popup__content">
        <div className="info__name">
          { lid.toUpperCase() }: { name }
        </div>
        <div className="info__image">
          <img src={hydrograph_image} style={style} onLoad={() => {onImageLoad()}}  />
        </div>
      </div>
    </div>
  )
}
