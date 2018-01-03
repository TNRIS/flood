import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PopupImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    link: PropTypes.string,
    updatePopup: PropTypes.func,
    target: PropTypes.string,
    popupImageLoadSuccess: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { src, link, updatePopup, target } = this.props

    const imageLoaded = () => {
      updatePopup()
      this.props.popupImageLoadSuccess()
    }

    return (
      <div className="info__image">
        <a href={link} target={target}>
          <img ref="image" src={src} onLoad={imageLoaded}  />
        </a>
      </div>
    )
  }
}
