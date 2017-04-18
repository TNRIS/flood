import L from 'leaflet'
import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import R from 'ramda'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, FABButton, Icon, IconButton, Menu, MenuItem
} from 'react-mdl'

const pause = require('../images/pause.png')

const defaultMarkerIcon = require('../images/ic_person_pin_circle_black_24dp_2x.png')
const gpsFixedIcon = require("../images/ic_gps_fixed_black_18dp_2x.png")
const gpsNotFixedIcon = require("../images/ic_gps_not_fixed_black_18dp_2x.png")

import axios from 'axios'

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
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      animationIcon: "play_arrow",
      geolocateControl: "basic",
      mapboxWordmarkClass: "hide-mapbox-wordmark",
      locateToolbar: null
    }
  }

  componentDidMount() {
    const initMap = (options) => {
      this.map = L.map(this.refs.map, {
        center: [options.latitude, options.longitude],
        zoom: options.zoom,
        minZoom: window.innerWidth < 768 ? 5 : 6
      })

      this.initializeGeocoderControl()
      this.initializeBasemapLayers()
      this.map.zoomControl.setPosition('bottomright')
      // this.map.attributionControl.setPrefix('Data Sourced From')
      this.initializeLayerStore(this.props, this.map)
      // this.fullscreenControl()
      this.geolocationControl()

      const defaultMarker = L.icon({
        iconUrl: defaultMarkerIcon,
        iconAnchor: [24, 44],
        popupAnchor: [0, -44]
      })

      const watchLocationMarker = L.icon({
        iconUrl: gpsFixedIcon,
        iconAnchor: [18, 20]
      })

      this.geolocateCircle = null
      this.geolocateIcon = null

      this.map
        .on('locationfound', (e) => {
          if (this.geolocateCircle) {
            this.map.removeLayer(this.geolocateCircle)
          }
          if (this.geolocateIcon) {
            this.map.removeLayer(this.geolocateIcon)
          }

          if (this.map._locateOptions && !this.map._locateOptions.watch) {
            this.geolocateIcon = L.marker(e.latlng, {
              icon: defaultMarker
            })
          }
          else {
            this.geolocateIcon = L.marker(e.latlng, {
              icon: watchLocationMarker
            })
          }

          this.geolocateIcon.bindPopup(
            `<h6>Approximate Location</h3>` +
            `<p>Latitude: ${e.latitude.toPrecision(7)}</p>` +
            `<p>Longitude: ${e.longitude.toPrecision(7)}</p>` +
            `<p>Accuracy: ${e.accuracy.toLocaleString({useGrouping: true})} meters</p>`,
            {
              className: 'geolocation-popup',
              closeButton: false
            }
          )

          this.geolocateIcon.on('contextmenu', () => {
            this.locateToolbar._buttons[1].state('location-off')
            this.map.stopLocate()
            this.map.removeLayer(this.geolocateIcon)
          })

          this.geolocateCircle = L.circle(e.latlng, e.accuracy, {
            color: "#265577",
            fillColor: "#3473A2",
            fillOpacity: 0.1,
            stroke: false
          })

          this.map.addLayer(this.geolocateIcon)

          // this.map.addLayer(this.geolocateCircle)

          if (this.map._locateOptions && !this.map._locateOptions.watch) {
            // this.map.fitBounds(
            //   this.geolocateCircle.getBounds()
            // )
            this.map.setView(e.latlng, 16)
          }
        })
        .on('locationerror', () => {
          this.props.showSnackbar(
            "Error retrieving location. Please verify permission has been granted to your device or browser."
          )
        })
        .on('zoomend dragend', () => {
          if (!this.props.popupData || this.props.popupData.id !== "ahps-flood") {
            const center = this.map.getCenter()
            const zoom =  this.map.getZoom()
            hashHistory.push(`/map/@${center.lat.toPrecision(7)},${center.lng.toPrecision(7)},${zoom}z`)
          }
          else {
            hashHistory.push(`/gage/${this.props.popupData.data.lid.toLowerCase()}`)
          }
        })
        .on('click', (e) => {
          L.DomEvent.preventDefault(e)
          L.DomEvent.stopPropagation(e)
        })
    }

    setTimeout(() => {
      const getZoom = () => {
        if (this.props.initialCenter.zoom && this.props.initialCenter.zoom.match(/\d*\z+/)) {
          return this.props.initialCenter.zoom.replace(/z$/, "")
        }
        return window.innerWidth < 768 ? 5 : 6
      }

      const initView = {
        latitude: this.props.initialCenter.lat || 31,
        longitude: this.props.initialCenter.lng || -100,
        zoom: getZoom()
      }
      if (this.props.hasOwnProperty("gageCenter") && this.props.gageCenter.lid) {
        const upperLid = this.props.gageCenter.lid.toUpperCase()
        const query = (
          `SELECT latitude, longitude, name, wfo FROM nws_ahps_gauges_texas_develop WHERE lid = '${upperLid}'`
        )
        axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
          .then(({data}) => {
            if (data.rows.length === 0) {
              this.props.showSnackbar(`Gage ${upperLid} could not be located.`)
              hashHistory.push("")
              return initMap(initView)
            }
            data.rows.map((gage) => {
              initView.latitude = gage.latitude
              initView.longitude = gage.longitude
              initView.zoom = 13

              initMap(initView)

              this.props.setPopup({
                id: 'ahps-flood',
                data: {
                  name: gage.name,
                  wfo: gage.wfo,
                  lid: this.props.gageCenter.lid
                },
                clickLocation: L.latLng(gage.latitude, gage.longitude)
              })
            })
          })
      }
      else {
        if (!this.props.initialCenter) {
          hashHistory.push("")
        }
        initMap(initView)
      }
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

    const lyrs = nextProps.featureLayers.layers
    if (lyrs[lyrs.length - 1]['active'] === true) {
      this.displayedTimestamp = lyrs[lyrs.length - 1]['displayedTimestamp']
    }
    else {
      this.displayedTimestamp = ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.map.mapCenterLat && this.props.map.mapCenterLng && this.props.map.zoomLevel) {
      const latlngPoint = new L.LatLng(this.props.map.mapCenterLat, this.props.map.mapCenterLng)
      this.map.setView(latlngPoint, this.props.map.zoomLevel)
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
    layerControl.setPosition('topright').addTo(this.map)
    this.map.on('baselayerchange', ({ layer }) => {
      layer.bringToBack()
      layer.options.mapbox ? this.setState({mapboxWordmarkClass: "mapbox-wordmark"}) :
                             this.setState({mapboxWordmarkClass: "hide-mapbox-wordmark"})
    })

    layers['Mapbox Outdoors'].addTo(this.map)
  }

  initializeGeocoderControl() {
    const control = L.Control.geocoder({
      geocoder: L.Control.Geocoder.bing(keys.bingApiKey),
      placeholder: "Search by City or Street Address",
      collapsed: false,
      position: "topright"
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.fitBounds(result.bbox)
    }

    control.addTo(this.map)
    control.getContainer().id = "geocoder"
  }

  //use a custom map bound functionality to restrict panning
  //leaflet maxBounds and panInsideBounds functions are buggy and
  //cause infinite pan loops when at awkward zoom levels
  initializeMapBounds() {
    // these are the more limiting maxbounds for texas
    // const maxBounds = [[25.7, -107], [36.8, -93.2]]
    const maxBounds = [[23.5, -112.6], [41, -83]]
    const center = this.map.getCenter()
    const newCenter = {lat: center.lat, lng: center.lng}
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
        icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">gps_not_fixed</i>',
        title: 'Track my location',
        onClick: (control) => {
          control.state('location-on')
          leafletMap.closePopup()
          leafletMap.locate({...geolocationOptions, watch: true})
          showSnackbar(
            "Using the track location feature on a mobile device will consume additional battery and data.", 3000
          )
        }
      }, {
        stateName: 'location-on',
        icon: '<i class="material-icons geolocate-icon location-on-button" style="font-size: 22px;">gps_fixed</i>',
        title: 'Track my location',
        onClick: (control) => {
          control.state('location-off')
          leafletMap.stopLocate()
        }
      }]
    }).disable()

    const geolocateButton = L.easyButton({
      states: [{
        icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">person_pin_circle</i>',
        title: 'Find my location',
        onClick: () => {
          leafletMap.closePopup()
          trackLocationButton.enable()
          leafletMap.locate(geolocationOptions)
        }
      }]
    })

    this.locateToolbar = L.easyBar([geolocateButton, trackLocationButton], {
      position: 'bottomright'
    })
    this.locateToolbar.addTo(leafletMap)
  }

  // fullscreenControl() {
  //   const thisMap = this.map
  //   const toggleFullscreen = this.toggleFullscreen
  //   const fullscreenButton = L.easyButton({
  //     position: 'topright',
  //     states: [{
  //       icon: '<i class="material-icons fullscreen-icon">fullscreen</i>',
  //       title: 'Toggle Fullscreen',
  //       onClick: function(control) {
  //         thisMap.closePopup()
  //         toggleFullscreen()
  //       }
  //     }]
  //   })
  //   fullscreenButton.addTo(this.map)
  // }

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
          <a href="http://mapbox.com/about/maps" className={this.state.mapboxWordmarkClass} target="_blank">Mapbox</a>
          <div className="weatherTimestamp">
            <p>{this.displayedTimestamp}</p>
          </div>
          <div className="animateRadar">
            {radarInfo}
          </div>
          {/* <div id="betanotice" className={this.betaNotice()}>
            <p><strong>Warning: </strong>This application is currently in development. For the official version, visit <a href="http://map.texasflood.org">http://map.texasflood.org</a></p>
          </div> */}
          <PopupContainer leafletMap={this.map} />
        </div>
      </div>

    )
  }
}
