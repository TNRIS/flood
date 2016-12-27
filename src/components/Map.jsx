import L from 'leaflet'
import React, { Component, PropTypes } from 'react'
import R from 'ramda'

import keys from '../keys'
import CustomPropTypes from '../CustomPropTypes'
import LayerStore from '../util/LayerStore'

import PopupContainer from '../containers/PopupContainer'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'

const demoSQL = require('../cartodb/nws-ahps-gauges-texas-demo.sql')
const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
import objectAssign from 'object-assign'
import * as FloodAlerts from '../util/FloodAlerts'



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
    this.state = {}
    this.updateLayerStore = this.updateLayerStore.bind(this);
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

      this.map.zoomControl.setPosition('topright')
      this.map.attributionControl.setPrefix('Data Sourced From')
      this.initializeLayerStore(this.props, this.map)
      this.initializeBasemapLayers()
      this.initializeGeocoderControl()
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
  }

  componentWillUnmount() {
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
      }
    })

    props.featureLayers.layers.forEach((layer) => {
      this.layerStore.add(layer.id, layer.type, layer.options)
    })
  }

  updateLayerStore() {
    const newProps = objectAssign({}, this.props, {
          featureLayers: { layers:
            this.props.featureLayers.layers.map((layer) => {
              if (layer.id == 'ahps-flood') {
                return objectAssign({}, layer, {
                  options: {
                    'refreshTimeMs': 300000, // 5 minutes
                    'account': 'tnris-flood',
                    'sql': demoSQL,
                    'interactivity': [
                      'lid',
                      'name',
                      'wfo',
                    ],
                    'cartocss': floodCartoCSS,
                    'attribution': '<a href="http://water.weather.gov/ahps/">NOAA National Weather Service</a>',
                  }
                })
              } else {
                return objectAssign({}, layer)
              }
            })
        }
      });
    this.layerStore = null;
    this.map.eachLayer((layer)  => {
      const binary = layer._url.includes('basemaps')
      if (!binary) {
        this.map.removeLayer(layer)
      }
    })
    this.initializeLayerStore(newProps, this.map);
    FloodAlerts.checkStage('tnris-flood');
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

    layers['Positron'].addTo(this.map)
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
        <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.updateLayerStore}>Simulate Flood</button>
      </div>
      
    )
  }
}
