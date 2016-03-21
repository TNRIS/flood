/*global L*/
import React, { PropTypes } from 'react'
import R from 'ramda'
import fullscreen from 'fullscreen'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'


const Map = React.createClass({
  propTypes: {
    baseLayers: PropTypes.shape({
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer),
      active: PropTypes.string
    }),
  },
  getInitialState() {
    return {}
  },
  componentDidMount() {
    this.initializeLayerStore(this.props)

    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 7,
        minZoom: 5
      })

      this.initializeFullscreenButton()

      this.setActiveBaseLayer(this.props)
    }, 0)
  },
  componentWillUpdate(nextProps) {
    if (this.props.baseLayers.active !== nextProps.baseLayers.active) {
      this.setActiveBaseLayer(nextProps)
    }

    const activeFeatureLayerBools = (props) => {
      return props.featureLayers.layers.map((l) => l.active === true)
    }
    if (activeFeatureLayerBools(this.props) !== activeFeatureLayerBools(nextProps)) {
      this.setActiveFeatureLayers(nextProps)
    }
  },
  componentWillUnmount() {
    this.fs.dispose()
  },
  setActiveFeatureLayers(props) {
    const leafletMap = this.map
    const activeLayers = props.featureLayers.layers.filter((layer) => layer.active)

    R.toPairs(this.layerStore.all()).forEach(([cacheId, layer]) => {
      const isActive = R.find((activeLayer) => activeLayer.id === cacheId, activeLayers)

      if (isActive) {
        layer.addTo(leafletMap)
      }
      else if (!isActive) {
        layer.removeFrom(leafletMap)
      }
    })
  },
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
  },
  initializeLayerStore(props) {
    this.layerStore = new LayerStore()
    props.featureLayers.layers.forEach((layer) => {
      this.layerStore.add(layer.id, layer.type, layer.options)
    })
  },
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
  },
  render() {
    return (
      <div className="map">
        <div ref="map" className="map--full">
        </div>
      </div>
    )
  },
})

export default Map
