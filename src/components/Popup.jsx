import objectAssign from 'object-assign'
import ReactDOM from 'react-dom'
import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import L from 'leaflet'
import FloodAlertsPopup from './FloodAlertsPopup'
import FloodGaugePopup from './FloodGaugePopup'
import LakeConditionsPopup from './LakeConditionsPopup'


export default class Popup extends Component {
  static propTypes = {
    gageInfo: PropTypes.object,
    leafletMap: PropTypes.object,
    popup: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
    layerId: PropTypes.string,
    browser: PropTypes.object,
    setLidAndName: PropTypes.func
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
      keepInView: true,
      ...widths
    })
  }

  componentDidUpdate(prevProps) {
    // should only happen the first time after map has initialized
    if ( !prevProps.leafletMap && this.props.leafletMap ) {
      this.updatePopupSize()
    }

    if (this.leafletPopup && prevProps !== this.props) {
      if (this.props.leafletMap && !this.props.popup) {
        return ReactDOM.unmountComponentAtNode(this.leafletPopup._contentNode)
      }
      if (this.props.popup && this.props.popup.id === "ahps-flood") {
        const lid = this.props.popup.data.lid
        const gage = this.props.gageInfo[lid]
        this.leafletPopup.setLatLng([gage.latitude, gage.longitude])

        this.leafletPopup.openOn(this.props.leafletMap)
        this.renderPopupContent()
      }
    }
    // console.log(this.leafletPopup)
    // const position = [32, -105]
    // if ( this.props.leafletMap && ((!position || !this.props.data) || !R.equals(data, prevProps.data)) ) {
    //   this.props.leafletMap.closePopup(this.leafletPopup)
    // }
    //
    // // should only happen the first time after map has initialized
    // if ( !prevProps.leafletMap && this.props.leafletMap ) {
    //   this.updatePopupSize()
    // }
    //
    // if (prevProps.browser.width !== this.props.browser.width || prevProps.browser.height !== this.props.browser.height) {
    //   this.updatePopupSize()
    // }
    //
    // if (position !== prevProps.position) {
    //   this.leafletPopup.setLatLng([32, -105])
    // }
    //
    // if (this.props.popup.data) {
    //   this.leafletPopup.openOn(this.props.leafletMap)
    // }
    //
    // if (this.leafletPopup._isOpen) {
    //   // this will ensure that only the popup for the topmost layer will
    //   // show when features are stacked at a clicked location
    //   if (position === prevProps.position) {
    //     switch (this.props.popup.id) {
    //       case "ahps-flood":
    //         this.renderPopupContent()
    //         break
    //       case "reservoir-conditions":
    //         if (prevProps.layerId !== "ahps-flood") {
    //           this.renderPopupContent()
    //         }
    //         break
    //       case "flood-alerts":
    //         if (prevProps.layerId !== "ahps-flood") {
    //           if (prevProps.layerId !== "reservoir-conditions") {
    //             this.renderPopupContent()
    //           }
    //         }
    //         break
    //       default:
    //         null
    //     }
    //   }
    //   else {
    //     this.renderPopupContent()
    //   }
    // }
  }

  getPopupContent() {
    const { data, id } = this.props.popup
    const popupWidth = this.calculatePopupWidth()
    switch (id) {
      case 'ahps-flood':
        this.props.setLidAndName(data.lid, data.name)
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
      // maxHeight: leafletMap ? leafletMap.getSize().y * 0.8 : 500,
    }
  }

  removePopupContent() {
    if (this.leafletPopup._contentNode) {
      ReactDOM.unmountComponentAtNode(this.leafletPopup._contentNode)
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
