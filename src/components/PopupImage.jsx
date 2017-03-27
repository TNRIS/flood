import React, { Component, PropTypes } from 'react'

export default class PopupImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    link: PropTypes.string,
    updatePopup: PropTypes.func,
    target: PropTypes.string,
  }

  render() {
    const { src, link, updatePopup, target } = this.props

    return (
      <div className="info__image">
        <a href={link} target={target}>
          <img ref="image" src={src} onLoad={() => {updatePopup()}}  />
        </a>
      </div>
    )
  }
}
