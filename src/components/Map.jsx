import L from 'leaflet'
import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import {  hashHistory } from 'react-router'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'
import { FABButton, Icon } from 'react-mdl'

const pause = require('../images/pause.png')

const defaultMarkerIcon = require('../images/ic_my_location_black_24dp_2x.png')

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
    onClickAlerts: PropTypes.func.isRequired,
    onClickUTFGrid: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      animationIcon: "play_arrow",
      geolocateControl: "basic",
      mapboxWordmarkClass: "hide-mapbox-wordmark"
    }
  }

  componentDidMount() {
    const initMap = (options) => {
      this.map = L.map(this.refs.map, {
        center: [options.latitude, options.longitude],
        zoom: options.zoom,
        minZoom: window.innerWidth < 768 ? 5 : 6
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
            `<p>Latitude: ${e.latitude.toPrecision(7)}</p>` +
            `<p>Longitude: ${e.longitude.toPrecision(7)}</p>` +
            `<p>Accuracy: ${e.accuracy.toLocaleString({useGrouping: true})} meters</p>`
          )

          geolocateCircle = L.circle(e.latlng, e.accuracy, {
            color: "#265577",
            fillColor: "#3473A2",
            fillOpacity: 0.2
          })

          this.map.addLayer(geolocateIcon)

          if (e.accuracy > 50) {
            this.props.showSnackbar(
              "Geolocation accuracy is low. For best results, use your device's GPS, if equipped.")
          }
          this.map.addLayer(geolocateCircle)

          if (this.map._locateOptions && !this.map._locateOptions.watch) {
            this.map.fitBounds(
              geolocateCircle.getBounds()
            )
          }
        })
        .on('locationerror', () => {
          this.props.showSnackbar(
            "Error retrieving location. Please verify permission has been granted to your device or browser."
          )
        })
        .on('moveend', () => {
          const center = this.map.getCenter()
          const zoom =  this.map.getZoom()
          hashHistory.push(`/map/@${center.lat.toPrecision(7)},${center.lng.toPrecision(7)},${zoom}z`)
        })
        .on('popupclose', () => {
          // this.props.removeAllPopups()
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
          `SELECT latitude, longitude FROM nws_ahps_gauges_texas WHERE lid = '${upperLid}'`
        )
        axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
          .then(({data}) => {
            if (data.rows.length === 0) {
              this.props.showSnackbar(`Gage ${upperLid} could not be located.`)
              this.props.hashHistory.push("")
              return initMap(initView)
            }
            data.rows.map((gage) => {
              initView.latitude = gage.latitude
              initView.longitude = gage.longitude
              initView.zoom = 13
            })
            initMap(initView)
          })
      }
      else {
        if (!this.props.initialCenter) {
          this.props.hashHistory.push("")
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
    layerControl.setPosition('bottomright').addTo(this.map)
    this.map.on('baselayerchange', ({ layer }) => {
      layer.bringToBack()
      if (layer.options.mapbox) {
        this.setState({mapboxWordmarkClass: "mapbox-wordmark"})
      }
      else {
        this.setState({mapboxWordmarkClass: "hide-mapbox-wordmark"})
      }
    })

    layers['Mapbox Outdoors'].addTo(this.map)
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
    const removeAllPopups = this.props.removeAllPopups

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
          leafletMap.closePopup()
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
          <a href="http://mapbox.com/about/maps" className={this.state.mapboxWordmarkClass} target="_blank">Mapbox</a>
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
