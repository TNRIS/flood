/*global L*/
import React, { PropTypes } from 'react'
import R from 'ramda'
import axios from 'axios'

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
  toggleWeatherLayer(props) {
    if (this.weatherLayerTimeout) {
      clearTimeout(this.weatherLayerTimeout)
      this.weatherLayerTimeout = null
    }

    if (this.weatherLayers) {
      this.weatherLayers.forEach((layer) => this.map.removeLayer(layer))
      this.weatherLayers = null
    }

    if (props.activeWeatherLayerId === 'radar') {
      //Ref: http://www.aerisweather.com/support/docs/aeris-maps/map-access/map-tiles/
      //NOTE: This call is very slow over https (it is faster on http)
      axios.get(`http://maps.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar.json`)
        .then(({ data }) => {
          const limit = 20
          const baseUrl = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/`
          this.weatherLayers = R.take(limit, data.files).map((file) => {
            return L.tileLayer(`${baseUrl}${file.time}.png`, {
              subdomains: '1234',
              opacity: 0,
              attribution: 'Aeris Weather'  //TODO: proper attribution
            })
          })

          this.weatherLayers.forEach((layer) => {
            layer.addTo(this.map).bringToFront()
          })

          let i = 0
          const showWeatherLayer = () => {
            const layer = this.weatherLayers[i]
            this.weatherLayers.forEach((lyr) => lyr.setOpacity(0))
            layer.setOpacity(0.8)
            i++
            if (i >= limit) {
              i = 0
            }
            this.weatherLayerTimeout = setTimeout(showWeatherLayer, data.validTimeInterval)
          }

          showWeatherLayer()
        })
    }
  },
  initializeLayerCache(props) {
    const layerCache = this.layerCache
    props.featureLayers.layers.forEach((layer) => {
      layerCache.add(layer.id, layer.type, layer.options)
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
