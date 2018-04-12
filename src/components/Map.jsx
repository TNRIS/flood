import L from 'leaflet'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import * as R from 'ramda'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'

const defaultMarkerIcon = require('../images/ic_person_pin_circle_black_24dp_2x.png')
const gpsFixedIcon = require("../images/ic_gps_fixed_black_18dp_2x.png")

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
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer),
      active: PropTypes.string
    }),
    onLayerStatusChange: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      animationIcon: "fi-play",
      geolocateControl: "basic",
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
      this.initializeLayerStore(this.props, this.map)

      const defaultMarker = L.icon({
        iconUrl: defaultMarkerIcon,
        iconAnchor: [24, 44],
        popupAnchor: [0, -44]
      })

      const watchLocationMarker = L.icon({
        iconUrl: gpsFixedIcon,
        iconAnchor: [18, 20]
      })

      this.geolocationControl(defaultMarker)

      this.geolocateCircle = null
      this.geolocateIcon = null
      this.popupContentNode = null

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
            this.locateToolbar._buttons[1].disable()
            this.locateToolbar._buttons[0].state('zoom-to-location')
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

          if (this.map._locateOptions && !this.map._locateOptions.watch) {
            this.map.setView(e.latlng, 16)
          }
        })
        .on('locationerror', (e) => {
          this.props.showSnackbar(
            "Error retrieving location. Please verify permission has been granted to your device or browser."
          )
          this.locateToolbar._buttons[1].state('location-off')
          this.locateToolbar._buttons[1].disable()
          this.locateToolbar._buttons[0].state('zoom-to-location')
          this.map.stopLocate()
          if (this.map.hasLayer(this.geolocateIcon)) {
            this.map.removeLayer(this.geolocateIcon)
          }
        })
        .on('zoomend dragend', () => {
          if (!this.props.popupData || this.props.popupData.id !== "ahps-flood") {
            const center = this.map.getCenter()
            const zoom =  this.map.getZoom()
            const urlPath = `/map/@${center.lat.toPrecision(7)},${center.lng.toPrecision(7)},${zoom}z`
            if (this.props.history.location.pathname != urlPath) {
              this.props.history.push(urlPath)
            }
          }
          else {
            const urlPath = `/gage/${this.props.popupData.data.lid.toLowerCase()}`
            if (this.props.history.location.pathname != urlPath) {
              this.props.history.push(urlPath)
            }
          }
        })
        .on('popupopen', () => {
          const popupContent = document.getElementsByClassName('leaflet-popup-content')

          this.popupContentNode = popupContent.length > 0 ? popupContent[0] : null
        })
        .on('preclick', () => {
          this.props.clearPopup()
        })
        .on('popupclose', () => {
          if (this.popupContentNode) {
            ReactDOM.unmountComponentAtNode(this.popupContentNode)
          }

          const center = this.map.getCenter()
          const zoom =  this.map.getZoom()
          const urlPath = `/map/@${center.lat.toPrecision(7)},${center.lng.toPrecision(7)},${zoom}z`
          if (this.props.history.location.pathname != urlPath) {
            this.props.history.push(urlPath)
          }
        })
        .on('dblclick', (e) => {
          const zoom =  this.map.getZoom()
          const southwest = L.latLng(30.263042706097306, -97.75079011917114)
          const northeast = L.latLng(30.26316780672294, -97.75057554244995)
          const bounds = L.latLngBounds(southwest, northeast)
          const contains = bounds.contains(e.latlng)
          if (contains == true && zoom == 18) {
            window.open('https://youtu.be/KC5H9P4F5Uk', '_stevieVaughan')
          }
        })
        .on('click', (e) => {
          L.DomEvent.preventDefault(e)
          L.DomEvent.stopPropagation(e)
        })


    }

    setTimeout(() => {
      const getZoom = () => {
        if (this.props.match.params.zoom && this.props.match.params.zoom.match(/\d*\z+/)) {
          return this.props.match.params.zoom.replace(/z$/, "")
        }
        return window.innerWidth < 768 ? 5 : 6
      }

      const initView = {
        latitude: this.props.match.params.lat || 31,
        longitude: this.props.match.params.lng || -100,
        zoom: getZoom()
      }
      if (this.props.match.params.lid) {
        const upperLid = this.props.match.params.lid.toUpperCase()
        const query = (
          `SELECT latitude, longitude, name, wfo FROM nws_ahps_gauges_texas_develop WHERE lid = '${upperLid}'`
        )
        axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
          .then(({data}) => {
            if (data.rows.length === 0) {
              this.props.showSnackbar(`Gage ${upperLid} could not be located.`)
              this.props.history.push("")
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
                  lid: this.props.match.params.lid
                },
                clickLocation: L.latLng(gage.latitude, gage.longitude)
              })
            })
          })
      }
      else {
        initMap(initView)
      }
    }, 1000)
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

    const basemaps = R.fromPairs(this.props.baseLayers.layers.map(propBaseLayer =>
      [propBaseLayer.id, leafletLayerForPropBaseLayer(propBaseLayer)]
    ))

    const activeBaseLayer = this.props.baseLayers.active

    const nextActiveBaseLayer = nextProps.baseLayers.active
    if (activeBaseLayer !== nextActiveBaseLayer) {
      basemaps[nextActiveBaseLayer].addTo(this.map)
      this.map.eachLayer((layer) => {
        if (layer.options.layerId === activeBaseLayer) {
          this.map.removeLayer(layer)
        }
      })
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
    layers['Streets'].addTo(this.map)
  }

  initializeGeocoderControl() {
    const control = L.Control.geocoder({
      geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
          countrycodes: 'us',
          state: "Texas",
          viewbox: [-115.02685546875, 39.740986355883564, -84.70458984375, 23.563987128451217],
          bounded: 1
        }
      }),
      placeholder: "Search by City or Street Address",
      collapsed: false,
      position: "topright"
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.closePopup()
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

  geolocationControl(defaultMarker) {
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
        icon: '<i class="fi-compass track-location-icon" style="font-size: 22px;"></i>',
        title: 'Follow my location',
        onClick: (control) => {
          control.state('location-on')
          leafletMap.closePopup()
          leafletMap.locate({...geolocationOptions, watch: true})
          showSnackbar(
            "Using the follow location feature on a mobile device will consume additional battery and data.", 3000
          )
        }
      }, {
        stateName: 'location-on',
        icon: '<i class="fi-target-two track-location-icon location-on-button" style="font-size: 22px;"></i>',
        title: 'Stop following my location',
        onClick: (control) => {
          control.state('location-off')
          leafletMap.stopLocate()

          if (this.geolocateIcon) {
            this.map.removeLayer(this.geolocateIcon)
          }

          const latlng = this.geolocateIcon._latlng
          const prevPopupContent = this.geolocateIcon._popup._content

          this.geolocateIcon = L.marker(latlng, {
            icon: defaultMarker
          })

          this.geolocateIcon.bindPopup(
            prevPopupContent,
            {
              className: 'geolocation-popup',
              closeButton: false
            }
          )

          leafletMap.addLayer(this.geolocateIcon)
        }
      }]
    }).disable()

    const geolocateButton = L.easyButton({
      type: 'animate',
      states: [{
        stateName: 'zoom-to-location',
        icon: '<i class="fi-marker geolocate-icon" style="font-size: 22px;"></i>',
        title: 'Find my location',
        onClick: (control) => {
          control.state("reset-geolocation-tools")
          leafletMap.closePopup()
          trackLocationButton.enable()
          leafletMap.locate(geolocationOptions)
        }
      }, {
        stateName: 'reset-geolocation-tools',
        icon: '<i class="fi-x geolocate-icon" style="font-size: 22px;"></i>',
        title: 'Reset geolocation tools',
        onClick: (control) => {
          control.state("zoom-to-location")
          leafletMap.removeLayer(this.geolocateIcon)
          leafletMap.stopLocate()
          trackLocationButton.state('location-off')
          trackLocationButton.disable()
        }
      }]
    })

    this.locateToolbar = L.easyBar([geolocateButton, trackLocationButton], {
      position: 'bottomright'
    })
    this.locateToolbar.addTo(leafletMap)
  }

  toggleAnimation() {
    this.layerStore.get('animated-weather').toggleAnimation()
    if (this.layerStore.get('animated-weather').animate === true) {
      this.setState({animationIcon: "fi-pause"})
    }
    else {
      this.setState({animationIcon: "fi-play"})
    }
  }

  render() {
    let radarInfo
    if (this.displayedTimestamp !== '') {
      radarInfo =  (
        <button className="button" type="button" onClick={() => {this.toggleAnimation()}}>
          <i className={this.state.animationIcon}></i>
        </button>
      )
    }

    return (
      <div className="map">
        <div ref="map" className="map--full">
          <div className="weather-timestamp">
            <p>{this.displayedTimestamp}</p>
          </div>
          <div className="animate-radar">
            {radarInfo}
          </div>
          <PopupContainer leafletMap={this.map} />
        </div>
      </div>

    )
  }
}
