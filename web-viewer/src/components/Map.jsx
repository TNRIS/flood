/*global L*/
import React, { PropTypes } from 'react'
import R from 'ramda'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerCache from '../util/LayerCache'


const Map = React.createClass({
  propTypes: {
    baseLayers: PropTypes.shape({
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer),
      active: PropTypes.string
    })
  },
  getInitialState() {
    this.layerCache = new LayerCache()

    return {}
  },
  componentDidMount() {
    this.initializeLayerCache(this.props)

    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 7,
        minZoom: 5
      })

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
  setActiveFeatureLayers(props) {
    const leafletMap = this.map
    const activeLayers = props.featureLayers.layers.filter((layer) => layer.active)

    R.toPairs(this.layerCache.all()).forEach(([cacheId, layer]) => {
      const isActive = R.find((activeLayer) => activeLayer.id === cacheId, activeLayers)

      if (isActive && layer.status === 'ready') {
        if (layer.tileLayer && !leafletMap.hasLayer(layer.tileLayer)) {
          leafletMap.addLayer(layer.tileLayer)
        }
        if (layer.utfGridLayer && !leafletMap.hasLayer(layer.utfGridLayer)) {
          leafletMap.addLayer(layer.utfGridLayer)
        }
      }
      else if (!isActive) {
        if (layer.tileLayer && leafletMap.hasLayer(layer.tileLayer)) {
          leafletMap.removeLayer(layer.tileLayer)
        }
        if (layer.utfGridLayer && leafletMap.hasLayer(layer.utfGridLayer)) {
          leafletMap.removeLayer(layer.utfGridLayer)
        }
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
  initializeLayerCache(props) {
    const layerCache = this.layerCache
    props.featureLayers.layers.forEach((layer) => {
      layerCache.add(layer.id, layer.layerInfo)
    })
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
