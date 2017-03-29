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

const SQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
import objectAssign from 'object-assign'
import * as FloodAlerts from '../util/FloodAlerts'

const playArrow = require('../images/play_arrow.png')
const pause = require('../images/pause.png')

const defaultMarkerIcon = require('../images/ic_my_location_black_24dp_2x.png')

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
    onMouseoverUTFGrid: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      animationIcon: "play_arrow",
      geolocateControl: "basic"
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // check the screen width and set the initial zoom to 5 if they are
      // on a phone, set it to 6 for all other devices
      this.props.initialGageStatus()
      const initialZoom = window.innerWidth < 768 ? 5 : 6
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: initialZoom,
        minZoom: initialZoom
      })

      this.map.zoomControl.setPosition('topright')
      this.map.attributionControl.setPrefix('Data Sourced From')
      this.initializeLayerStore(this.props, this.map)
      this.initializeBasemapLayers()
      this.initializeGeocoderControl()
      this.fullscreenControl()
      this.geolocationControl()

      const defaultMarker = L.icon({
        iconUrl: defaultMarkerIcon,
        shadowUrl: "",
        iconAnchor: [24, 24]
      })

      let geolocateCircle = null
      let geolocateIcon = null

      this.map
        .on('locationfound', (e) => {
          console.log(e)
          if (geolocateCircle) {
            this.map.removeLayer(geolocateCircle)
          }
          if (geolocateIcon) {
            this.map.removeLayer(geolocateIcon)
          }

          geolocateIcon = L.marker(e.latlng, {
            icon: defaultMarker
          })

          geolocateIcon.bindLabel(
            `<h6>Approximate Location</h3>` +
            `<p>Latitude: ${e.latitude.toPrecision(8)}</p>` +
            `<p>Longitude: ${e.longitude.toPrecision(8)}</p>` +
            `<p>Accuracy: ${e.accuracy.toLocaleString({useGrouping: true})} meters</p>`
          )

          geolocateCircle = L.circle(e.latlng, e.accuracy, {
            color: "#265577",
            fillColor: "#3473A2",
            fillOpacity: 0.2
          })

          this.map.addLayer(geolocateIcon).addLayer(geolocateCircle)

          if (this.map._locateOptions && !this.map._locateOptions.watch) {
            this.map.fitBounds(
              geolocateCircle.getBounds()
            )
          }
        })
        // .on('contextmenu', (e) => {
        //   const clickMarker = L.marker(e.latlng, {
        //     icon: defaultMarker
        //   }).bindLabel(
        //     `<h6>Location</h3>` +
        //     `<p>Latitude: ${e.latlng.lat.toPrecision(8)}</p>` +
        //     `<p>Longitude: ${e.latlng.lng.toPrecision(8)}</p>`
        //   , {noHide: true}).addTo(this.map)
        // })
        .on('locationerror', (err) => {
          this.props.showSnackbar(
            "Error retrieving location. Please verify permission has been granted to your device or browser."
          )
        })
        .on('zoomstart', () => {
          if (this.map.hasLayer(geolocateCircle)) {
            this.map.removeLayer(geolocateCircle)
          }
        })
        .on('zoomend', () => {
          if (geolocateCircle) {
            this.map.addLayer(geolocateCircle)
          }
        })
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
      placeholder: "Search by City or Street Address",
      collapsed: false,
      position: "topleft"
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.fitBounds(result.bbox)
    }

    control.addTo(this.map)
  }

  //use a custom map bound functionality to restrict panning
  //leaflet maxBounds and panInsideBounds functions are buggy and
  //cause infinite pan loops when at awkward zoom levels
  initializeMapBounds() {
    // these are the more limiting maxbounds for texas
    // const maxBounds = [[25.7, -107], [36.8, -93.2]]
    const maxBounds = [[23.5, -112.6], [41, -83]]
    const center = this.map.getCenter()
    let newCenter = {lat: center.lat, lng: center.lng}
    if (center.lat < maxBounds[0][0]) {
      newCenter.lat = maxBounds[0][0]
    }
    if (center.lat > maxBounds[1][0]) {
      newCenter.lat = maxBounds[1][0]
    }
    if (center.lng < maxBounds[0][1]) {
      newCenter.lng = maxBounds[0][1]
    }
    if (center.lng > maxBounds[1][1]) {
      newCenter.lng = maxBounds[1][1]
    }
    if (newCenter.lat !== center.lat || newCenter.lng !== center.lng) {
      this.map.panTo(newCenter, {
        animate: true
      })
    }
  }

  toggleFullscreen() {
    const element = document.getElementsByTagName("html")[0]
    if (document.fullscreenEnabled || 
        document.webkitIsFullScreen || 
        document.mozFullScreen ||
        document.msFullscreenEnabled) {
      const req = document.exitFullScreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      req.call(document)
    } else {
      const req = element.requestFullScreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
      req.call(element)
    }
  }

  geolocationControl() {
    const leafletMap = this.map
    const showSnackbar = this.props.showSnackbar

    const geolocationOptions = {
      watch: false,
      setView: false,
      maximumAge: 10000,
      enableHighAccuracy: true
    }

    const trackLocationButton = L.easyButton({
      states: [{
        stateName: 'location-off',
        icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">location_off</i>',
        title: 'Track my location',
        onClick: (control) => {
          control.state('location-on')
          leafletMap.locate({...geolocationOptions, watch: true})
          showSnackbar(
            "Using the track location feature on a mobile device will consume additional battery and data.", 3000
          )
        }
      }, {
        stateName: 'location-on',
        icon: '<i class="material-icons geolocate-icon location-on-button" style="font-size: 22px;">location_on</i>',
        title: 'Track my location',
        onClick: (control) => {
          control.state('location-off')
          leafletMap.stopLocate()
        }
      }]
    }).disable()

    const geolocateButton = L.easyButton({
      states: [{
        icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">my_location</i>',
        title: 'Find my location',
        onClick: () => {
          leafletMap.closePopup()
          trackLocationButton.enable()
          leafletMap.locate(geolocationOptions)
        }
      }]
    })

    const locateToolbar = L.easyBar([geolocateButton, trackLocationButton], {
      position: 'topright'
    })
    locateToolbar.addTo(leafletMap)
  }

  fullscreenControl() {
    const thisMap = this.map
    const toggleFullscreen = this.toggleFullscreen
    const fullscreenButton = L.easyButton({
      position: 'topright',
      states: [{
        icon: '<i class="material-icons fullscreen-icon">fullscreen</i>',
        title: 'Toggle Fullscreen',
        onClick: function(control) {
          thisMap.closePopup()
          toggleFullscreen()
        }
      }]
    })
    fullscreenButton.addTo(this.map)
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
    }
    return "betanotice"
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
