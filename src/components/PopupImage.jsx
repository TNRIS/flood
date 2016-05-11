import React, { Component, PropTypes } from 'react'

export default class PopupImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    link: PropTypes.string,
    updatePopup: PropTypes.func,
  }

  render() {
    const { src, link, updatePopup } = this.props

    return (
      <div className="info__image">
        <a href={link}>
          <img ref="image" src={src} onLoad={() => {updatePopup()}}  />
        </a>
      </div>
    )
  }
}
