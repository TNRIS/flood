import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import L from 'leaflet'
import FloodAlertsPopup from './FloodAlertsPopup'
import FloodGaugePopup from './FloodGaugePopup'
import LakeConditionsPopup from './LakeConditionsPopup'

import {  hashHistory } from 'react-router'
import axios from 'axios'


export default class Popup extends Component {
  static propTypes = {
    gageInfo: PropTypes.object,
    leafletMap: PropTypes.object,
    popupData: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
    layerId: PropTypes.string,
    browser: PropTypes.object,
    setLidAndName: PropTypes.func,
    popupImageLoadAttempt: PropTypes.func,
    popupImageLoadSuccess: PropTypes.func,
    clearPopup: PropTypes.func
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

  componentDidUpdate(prevProps) {
    const {gageInfo, popupData, leafletMap} = this.props

    if ( !prevProps.leafletMap && leafletMap ) {
      leafletMap
        .on('popupclose', () => {
          this.removePopupContent()
          this.props.clearPopup()
        })
        .on('popupopen', () => {
          this.updatePopupSize()
        })
    }

    if (popupData.imageLoaded === true) {
      return
    }

    if (this.leafletPopup && prevProps !== this.props) {
      this.props.popupImageLoadAttempt()
      switch (popupData.id) {
        case 'ahps-flood':
          const lid = popupData.data.lid
          const gage = gageInfo[lid]
          this.leafletPopup.setLatLng(this.retrieveGageLocation(lid))
          hashHistory.push(`/gage/${lid.toLowerCase()}`)
          return this.showPopop()

        case 'flood-alerts':
          this.leafletPopup.setLatLng(popupData.clickLocation)
          this.props.popupImageLoadSuccess()
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
        this.props.setLidAndName(data.lid, data.name)
        return (
          <FloodGaugePopup {...data} updatePopup={() => {this.leafletPopup.update()}} />
        )
      case 'reservoir-conditions':
        return (
          <LakeConditionsPopup {...data} updatePopup={() => {this.leafletPopup.update()}} />
        )
      case 'flood-alerts':
        return (
          <FloodAlertsPopup {...data} updatePopup={() => {this.updatePopupSize()}} />
        )
      default:
        return null
    }
  }

  retrieveGageLocation(lid) {
    const gage = this.props.gageInfo[lid]

    if (gage) {
      return L.latLng(gage.latitude, gage.longitude)
    }
    const query = `SELECT latitude, longitude FROM nws_ahps_gauges_texas_develop WHERE lid = '${lid}'`
    axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`).then(({data}) => {
      data.rows.map((gageData) => {
        return L.latLng(gageData.latitude, gageData.longitude)
      })
    })
  }

  removePopupContent() {
    if (this.leafletPopup._contentNode) {
      ReactDOM.unmountComponentAtNode(this.leafletPopup._contentNode)
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
