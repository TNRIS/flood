import L from 'leaflet'
import React, { Component, PropTypes } from 'react'
import R from 'ramda'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, FABButton, Icon
} from 'react-mdl'

const demoSQL = require('../cartodb/nws-ahps-gauges-texas-demo.sql')
const SQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
import objectAssign from 'object-assign'
import * as FloodAlerts from '../util/FloodAlerts'

const playArrow = require('../images/play_arrow.png')
const pause = require('../images/pause.png')


function leafletLayerForPropBaseLayer(propBaseLayer) {
  let baseLayer

  switch (propBaseLayer.type) {
    case 'tile':
      baseLayer = L.tileLayer(propBaseLayer.url, propBaseLayer.options)
      break
    case 'bing':
      baseLayer = L.bingLayer(keys.bingApiKey, propBaseLayer.options)
      break
    case 'wmts':
      baseLayer = L.tileLayer.wmts(propBaseLayer.url, propBaseLayer.options)
      break
    default:
      throw new Error('unrecognized base layer type')
  }

  return baseLayer
}


export default class Map extends Component {
  static propTypes = {
    baseLayers: PropTypes.shape({
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer)
    }),
    onLayerStatusChange: PropTypes.func.isRequired,
    onClickAlerts: PropTypes.func.isRequired,
    onClickUTFGrid: PropTypes.func.isRequired,
    onMouseoutUTFGrid: PropTypes.func.isRequired,
    onMouseoverUTFGrid: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      animationIcon: "play_arrow"
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // check the screen width and set the initial zoom to 5 if they are
      // on a phone, set it to 6 for all other devices
      const initialZoom = document.documentElement.clientWidth < 768 ? 5 : 6
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: initialZoom,
        minZoom: initialZoom,
        maxBounds: [[21, -112.5], [41, -88]]
      })

      this.map.zoomControl.setPosition('topright')
      this.map.attributionControl.setPrefix('Data Sourced From')
      this.initializeLayerStore(this.props, this.map)
      this.initializeBasemapLayers()
      this.initializeGeocoderControl()
      this.geolocateControl()
    }, 0)
  }

  componentWillUpdate(nextProps) {
    // only trigger show() and hide() on feature layers when the set of active
    // layers has changed, or an active layer has had a status change
    const activeFeatureLayerBools = (props) => {
      return props.featureLayers.layers.map((l) => l.active === true)
    }
    const activeFeaturesChanged = !R.equals(activeFeatureLayerBools(this.props), activeFeatureLayerBools(nextProps))

    const activeFeatureStatuses = (props) => {
      return props.featureLayers.layers.map((l) => l.active ? l.status : null)
    }
    const activeFeatureStatusesChanged = !R.equals(activeFeatureStatuses(this.props), activeFeatureStatuses(nextProps))

    if (activeFeaturesChanged || activeFeatureStatusesChanged) {
      this.setActiveFeatureLayers(nextProps)
    }

    if (nextProps.featureLayers.layers[1]['active'] === true) {
      this.displayedTimestamp = nextProps.featureLayers.layers[1]['displayedTimestamp']
    }
    else {
      this.displayedTimestamp = ''
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.map.mapCenterLat && this.props.map.mapCenterLng && this.props.map.zoomLevel) {
      this.map.closePopup()
      this.map.setView([this.props.map.mapCenterLat, this.props.map.mapCenterLng], this.props.map.zoomLevel)
      this.props.clearCenterAndZoom()
    }
  }

  setActiveFeatureLayers(props) {
    // TODO: this should be cleaned up - this way of setting the cursor is
    // really not the right way to do things
    this.map._container.classList.toggle('map__cursor--pointer', false)

    const activeLayers = props.featureLayers.layers.filter((layer) => layer.active)

    R.toPairs(this.layerStore.all()).forEach(([cacheId, layer]) => {
      const isActive = R.find((activeLayer) => activeLayer.id === cacheId, activeLayers)

      if (isActive) {
        layer.show()

        if (layer.id === 'flood-alerts') {
          this.map._container.classList.toggle('map__cursor--pointer', true)
        }
      }
      else if (!isActive) {
        layer.hide()
      }
    })
  }

  initializeLayerStore(props, map) {
    this.layerStore = new LayerStore({
      map,
      handlers: {
        layerStatusChange: this.props.onLayerStatusChange,
        onClickAlerts: this.props.onClickAlerts,
        onClickUTFGrid: this.props.onClickUTFGrid,
        onMouseoutUTFGrid: this.props.onMouseoutUTFGrid,
        onMouseoverUTFGrid: this.props.onMouseoverUTFGrid,
        updateTimestamp: this.props.updateTimestamp,
      }
    })
    props.featureLayers.layers.map((layer) => {
      this.layerStore.add(layer.id, layer.type, layer.options)
    })
  }

  initializeBasemapLayers() {
    const layers = R.fromPairs(this.props.baseLayers.layers.map(propBaseLayer =>
      [propBaseLayer.text, leafletLayerForPropBaseLayer(propBaseLayer)]
    ))
    const layerControl = L.control.layers(layers)
    layerControl.setPosition('bottomright').addTo(this.map)
    this.map.on('baselayerchange', ({ layer }) => {
      layer.bringToBack()
    })

    layers['OpenStreetMap'].addTo(this.map)
  }

  initializeGeocoderControl() {
    const control = L.Control.geocoder({
      geocoder: L.Control.Geocoder.bing(keys.bingApiKey),
      placeholder: "Search by City or Street Address"
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.fitBounds(result.bbox)
    }

    control.addTo(this.map)
  }

  geolocateControl() {
    const thisMap = this.map
    const geolocateButton = L.easyButton({
      position: 'topright',
      states: [{
        icon: '<i class="material-icons" style="font-size: 20px;margin-top:2px;">location_searching</i>',
        title: 'Find my location',
        onClick: function(control) {
          thisMap.closePopup()
          thisMap.locate({setView: true, enableHighAccuracy: true})
        }
      }]
    })
    geolocateButton.addTo(this.map)
  }

  toggleAnimation() {
    this.layerStore.get('animated-weather').toggleAnimation()
    if (this.layerStore.get('animated-weather').animate === true) {
      this.setState({animationIcon: "pause"})
    }
    else {
      this.setState({animationIcon: "play_arrow"})
    }
  }

  betaNotice() {
    if (document.URL === 'http://map.texasflood.org/') {
      return "hide-beta"
    } else {
      return "betanotice"
    }
  }

  render() {
    let radarInfo
    if (this.displayedTimestamp !== '') {
      radarInfo =  (
                   <FABButton mini onClick={() => {this.toggleAnimation()}}>
                   <Icon
                        name={this.state.animationIcon}
                        className="material-icons md-dark"
                   />
                   </FABButton>
      )
    }

    return (
      <div className="map">
        <div ref="map" className="map--full">
          <div className="weatherTimestamp">
            <p>{this.displayedTimestamp}</p>
          </div>
          <div className="animateRadar">
            {radarInfo}
          </div>
          <div id="betanotice" className={this.betaNotice()}>
            <p><strong>Warning: </strong>This application is currently in development. For the official version, visit <a href="http://map.texasflood.org">http://map.texasflood.org</a></p>
          </div>
          <PopupContainer leafletMap={this.map} />
        </div>
      </div>

    )
  }
}
