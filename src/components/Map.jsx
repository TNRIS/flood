import L from 'leaflet'
import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import fullscreen from 'fullscreen'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'


export default class Map extends Component {
  static propTypes = {
    baseLayers: PropTypes.shape({
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer),
      active: PropTypes.string
    }),
    onLayerStatusChange: PropTypes.func.isRequired,
    onClickUTFGrid: PropTypes.func.isRequired,
    onMouseoutUTFGrid: PropTypes.func.isRequired,
    onMouseoverUTFGrid: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 7,
        minZoom: 5
      })

      // fit to Texas
      this.map.fitBounds([[25.8371, -106.6460], [36.5007, -93.5083]])

      this.map.attributionControl.setPrefix('Data Sourced From')

      this.initializeLayerStore(this.props, this.map)
      this.initializeFullscreenButton()
      this.initializeGeocoderControl()

      this.setActiveBaseLayer(this.props)
    }, 0)
  }

  componentWillUpdate(nextProps) {
    if (this.props.baseLayers.active !== nextProps.baseLayers.active) {
      this.setActiveBaseLayer(nextProps)
    }

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
  }

  componentWillUnmount() {
    this.fs.dispose()
  }

  setActiveFeatureLayers(props) {
    const activeLayers = props.featureLayers.layers.filter((layer) => layer.active)

    R.toPairs(this.layerStore.all()).forEach(([cacheId, layer]) => {
      const isActive = R.find((activeLayer) => activeLayer.id === cacheId, activeLayers)

      if (isActive) {
        layer.show()
      }
      else if (!isActive) {
        layer.hide()
      }
    })
  }

  setActiveBaseLayer(props) {
    if (this.baseLayer) {
      this.map.removeLayer(this.baseLayer)
    }

    const activeBaseLayer = R.find(baseLayer => baseLayer.id === props.baseLayers.active, props.baseLayers.layers)
    switch (activeBaseLayer.type) {
      case 'tile':
        this.baseLayer = L.tileLayer(activeBaseLayer.url, activeBaseLayer.options)
        break
      case 'bing':
        this.baseLayer = L.bingLayer(keys.bingApiKey, activeBaseLayer.options)
        break
      case 'wmts':
        this.baseLayer = L.tileLayer.wmts(activeBaseLayer.url, activeBaseLayer.options)
        break
      default:
        throw new Error('unrecognized base layer type')
    }

    this.baseLayer.addTo(this.map).bringToBack()
  }

  initializeLayerStore(props, map) {
    this.layerStore = new LayerStore({
      map,
      handlers: {
        layerStatusChange: this.props.onLayerStatusChange,
        onClickUTFGrid: this.props.onClickUTFGrid,
        onMouseoutUTFGrid: this.props.onMouseoutUTFGrid,
        onMouseoverUTFGrid: this.props.onMouseoverUTFGrid,
      }
    })

    props.featureLayers.layers.forEach((layer) => {
      this.layerStore.add(layer.id, layer.type, layer.options)
    })
  }

  initializeFullscreenButton() {
    if (!fullscreen.available()) {
      return
    }
    //else, setup fullscreen emitter
    this.fs = fullscreen(document.body)

    this.fullscreenButton = L.easyButton({
      states: [{
        stateName: 'make-fullscreen',
        icon: '<i class="material-icons md-24">fullscreen</i>',
        title: 'Make fullscreen',
        onClick: () => {
          this.fs.request()
        }
      }, {
        stateName: 'exit-fullscreen',
        icon: '<i class="material-icons md-24">fullscreen_exit</i>',
        title: 'Exit fullscren',
        onClick: () => {
          this.fs.release()
        }
      }],
      position: 'topright'
    })

    this.fs.on('attain', () => {
      this.map.invalidateSize('false')
      this.fullscreenButton.state('exit-fullscreen')
    })

    this.fs.on('release', () => {
      this.map.invalidateSize('false')
      this.fullscreenButton.state('make-fullscreen')
    })

    this.fullscreenButton.addTo(this.map)
  }

  initializeGeocoderControl() {
    const control = L.Control.geocoder({
      geocoder: L.Control.Geocoder.bing(keys.bingApiKey)
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.fitBounds(result.bbox)
    }

    control.addTo(this.map)
  }

  render() {
    return (
      <div className="map">
        <div ref="map" className="map--full">
          <PopupContainer leafletMap={this.map} />
        </div>
      </div>
    )
  }
}
