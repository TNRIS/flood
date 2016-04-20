import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

import { FloodGaugePopup } from './FloodGaugePopup'


export default class Popup extends Component {
  static propTypes = {
    leafletMap: PropTypes.object,
    popupInfo: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
    layerId: PropTypes.string,
    browser: PropTypes.object,
  }

  constructor() {
    super()
  }

  componentDidMount() {
    this.leafletPopup = L.popup({
      className: 'popup',
      closeButton: false,
      maxWidth: this.calculatePopupWidth(),
    })
  }

  componentDidUpdate(prevProps) {
    const { position, data, leafletMap } = this.props

    // should only happen the first time map after map has initialized
    if ( !prevProps.leafletMap && leafletMap ) {
      this.updatePopupSize()
    }

    if (prevProps.browser.width !== this.props.browser.width) {
      this.updatePopupSize()
    }

    if (position !== prevProps.position) {
      this.leafletPopup.setLatLng(position)
    }

    if (data) {
      this.leafletPopup.openOn(leafletMap)
    }

    if (this.leafletPopup._isOpen) {
      this.renderPopupContent()
    }
  }

  getPopupContent() {
    const { data, layerId } = this.props
    const popupWidth = this.calculatePopupWidth()

    switch (layerId) {
      case 'ahps-flood':
        return (
          <FloodGaugePopup {...data} popupWidth={popupWidth} updatePopup={() => {this.leafletPopup.update()}} />
        )
      case 'reservoir-conditions':
        return (
          <div>
            lake!
          </div>
        )
      default:
        return null
    }
  }

  calculatePopupWidth() {
    const { leafletMap } = this.props
    const width = leafletMap ? leafletMap.getSize().x * 0.9 : 500
    return width
  }

  removePopupContent() {
    if (this.leafletPopup._contentNode) {
      unmountComponentAtNode(this.leafletPopup._contentNode)
    }
  }

  updatePopupSize() {
    this.leafletPopup.options.maxWidth = this.calculatePopupWidth()

    if (this.leafletPopup._isOpen) {
      this.leafletPopup.update()
    }
  }

  renderPopupContent() {
    const content = this.getPopupContent()
    if (content) {
      ReactDOM.render(
        content,
        this.leafletPopup._contentNode
      )

      this.leafletPopup.update()
    }
    else {
      this.removePopupContent()
    }
  }

  render() {
    return null
  }
}
