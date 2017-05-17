import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import L from 'leaflet'

import FloodAlertsPopup from './FloodAlertsPopup'
import FloodGaugePopup from './FloodGaugePopup'
import LakeConditionsPopup from './LakeConditionsPopup'

import {  hashHistory } from 'react-router'


export default class Popup extends Component {
  static propTypes = {
    gageInfo: PropTypes.object,
    leafletMap: PropTypes.object,
    popupData: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
    layerId: PropTypes.string,
    browser: PropTypes.object,
    popupImageLoadAttempt: PropTypes.func,
    popupImageLoadSuccess: PropTypes.func
  }

  constructor() {
    super()
  }

  componentDidMount() {
    this.leafletPopup = L.popup({
      className: 'popup',
      closeButton: false,
      maxheight: 600,
      keepInView: true
    })
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  componentDidUpdate(prevProps) {
    const { gageInfo, popupData } = this.props

    if (this.leafletPopup && prevProps.popupData !== this.props.popupData) {
      switch (popupData.id) {
        case 'ahps-flood':
          const lid = popupData.data.lid

          const gage = gageInfo[lid]
          const popupLocation = gage ? L.latLng(gage.latitude, gage.longitude) : popupData.clickLocation
          this.leafletPopup.setLatLng(popupLocation)
          hashHistory.push(`/gage/${lid.toLowerCase()}`)
          return this.showPopop()

        case 'flood-alerts':
          this.leafletPopup.setLatLng(popupData.clickLocation)
          return this.showPopop()

        case 'reservoir-conditions':
          this.leafletPopup.setLatLng(popupData.clickLocation)
          return this.showPopop()

        default:
          return null
      }
    }
  }

  getPopupContent() {
    const { data, id } = this.props.popupData
    switch (id) {
      case 'ahps-flood':
        return (
          <FloodGaugePopup {...data}
          updatePopup={() => {this.leafletPopup.update()}}
          leafletMap={this.props.leafletMap}/>
        )
      case 'reservoir-conditions':
        return (
          <LakeConditionsPopup {...data}
          updatePopup={() => {this.leafletPopup.update()}}
          leafletMap={this.props.leafletMap}/>
        )
      case 'flood-alerts':
        return (
          <FloodAlertsPopup {...data}
          updatePopup={() => {this.updatePopupSize()}}
          leafletMap={this.props.leafletMap}/>
        )
      default:
        return null
    }
  }

  updatePopupSize() {
    const {leafletMap} = this.props

    this.leafletPopup.update(
          this.leafletPopup.options = {
            ...this.leafletPopup.options,
            minWidth: (() => {
              const mapWidth = leafletMap.getSize().x
              if (mapWidth > 800) {
                if (this.props.popupData.id === 'reservoir-conditions') {
                  return 800
                }
                return 600
              }
              else if (mapWidth > 600) {
                if (this.props.popupData.id === 'reservoir-conditions') {
                  return 0.90 * mapWidth
                }
                return 600
              }
              return 0.90 * mapWidth
            })()
          })
  }

  showPopop() {
    this.leafletPopup.openOn(this.props.leafletMap)
    this.renderPopupContent()
    this.updatePopupSize()
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
  }

  render() {
    return null
  }
}
