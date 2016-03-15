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
    }),
    activeWeatherLayerId: PropTypes.string
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
      this.toggleWeatherLayer(this.props)
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

    if (nextProps.activeWeatherLayerId !== this.props.activeWeatherLayerId) {
      this.toggleWeatherLayer(nextProps)
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
  toggleWeatherLayer(props) {
    if (this.weatherLayer) {
      this.map.removeLayer(this.weatherLayer)
    }

    if (props.activeWeatherLayerId) {
      switch (props.activeWeatherLayerId) {
        case 'radar':
          //Ref: http://www.aerisweather.com/support/docs/aeris-maps/map-access/map-tiles/
          const url = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/0.png`
          //TODO: Put layer url in constants? or put in reducers/weatherLayer ?
          this.weatherLayer = L.tileLayer(url, {
            'subdomains': '1234',
            'attribution': 'AERIS'
          })
          this.weatherLayer.addTo(this.map).bringToFront()
          break
        default:
          throw new Error('unrecognized weather layer id')
      }
    }
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
