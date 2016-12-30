import objectAssign from 'object-assign'
import ReactDOM from 'react-dom'
import R from 'ramda'
import React, { Component, PropTypes } from 'react'

import FloodAlertsPopup from './FloodAlertsPopup'
import FloodGaugePopup from './FloodGaugePopup'
import LakeConditionsPopup from './LakeConditionsPopup'


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
    const widths = this.calculatePopupWidth()

    this.leafletPopup = L.popup({
      className: 'popup',
      closeButton: false,
      offset: [0, 15],
      ...widths
    })
  }

  componentDidUpdate(prevProps) {
    const { position, data, leafletMap } = this.props

    if ( leafletMap && ((!position || !data) || !R.equals(data, prevProps.data)) ) {
      leafletMap.closePopup(this.leafletPopup)
    }

    // should only happen the first time map after map has initialized
    if ( !prevProps.leafletMap && leafletMap ) {
      this.updatePopupSize()
    }

    if (prevProps.browser.width !== this.props.browser.width || prevProps.browser.height !== this.props.browser.height) {
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
        this.props.setLidAndName(this.props.data.lid, this.props.data.name)
        return (
          <FloodGaugePopup {...data} popupWidth={popupWidth} updatePopup={() => {this.leafletPopup.update()}} />
        )
      case 'reservoir-conditions':
        return (
          <LakeConditionsPopup {...data} popupWidth={popupWidth} updatePopup={() => {this.leafletPopup.update()}} />
        )
      case 'flood-alerts':
        return (
          <FloodAlertsPopup {...data} popupWidth={popupWidth} updatePopup={() => {this.updatePopupSize()}} />
        )
      default:
        return null
    }
  }

  calculatePopupWidth() {
    const { leafletMap } = this.props
    return {
      maxWidth: leafletMap ? leafletMap.getSize().x * 0.9 : 500,
      minWidth: leafletMap ? Math.max(300, Math.min(leafletMap.getSize().x * 0.5, 599)) : 270,
      maxHeight: leafletMap ? leafletMap.getSize().y * 0.8 : 500,
    }
  }

  removePopupContent() {
    if (this.leafletPopup._contentNode) {
      unmountComponentAtNode(this.leafletPopup._contentNode)
    }
  }

  updatePopupSize() {
    const updates = this.calculatePopupWidth()
    objectAssign(this.leafletPopup.options, updates)

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
