import React, { Component, PropTypes } from 'react'

export class FloodGaugePopup extends Component {
  static propTypes = {
    lid: PropTypes.string,
    name: PropTypes.string,
    hydrograph_image: PropTypes.string,
    updatePopup: PropTypes.func,
    popupWidth: PropTypes.number,
    browser: PropTypes.object,
  }

  componentDidUpdate() {
    // need to manually set graph image style property
    //   see: https://github.com/facebook/react/issues/1881
    // TLDR; !important is not important to React devs
    const width = this.props.popupWidth - 9.5 - 9.5 - 9.5 - 9.5

    this.refs.graphImage.style.setProperty('max-width', `${width}px`, 'important')
    this.props.updatePopup()
  }

  render() {
    const { lid, name, hydrograph_image, updatePopup, popupWidth } = this.props

    const imgStyle = {
      maxWidth: (popupWidth - 9.5) + 'px !important'
    }

    return (
      <div ref="popup">
        <div className="popup__title">
          Flood Gauge Information!!
        </div>
        <div className="popup__content">
          <div className="info__name">
            { lid.toUpperCase() }: { name }
          </div>
          <div className="info__image">
            <img ref="graphImage" src={hydrograph_image} style={imgStyle} onLoad={() => {updatePopup()}}  />
          </div>
        </div>
      </div>
    )
  }
}
