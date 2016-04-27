import React, { Component, PropTypes } from 'react'

export default class PopupImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    popupWidth: PropTypes.number,
  }

  render() {
    const { src, updatePopup } = this.props

    return (
      <div className="info__image">
        <a href={src}>
          <img ref="image" src={src} onLoad={() => {updatePopup()}}  />
        </a>
      </div>
    )
  }
}
