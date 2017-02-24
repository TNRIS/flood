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

const demoSQL = require('../cartodb/nws-ahps-gauges-texas-demo.sql')
const SQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
import objectAssign from 'object-assign'
import * as FloodAlerts from '../util/FloodAlerts'

const playArrow = require('../images/play_arrow.png')
const pause = require('../images/pause.png')


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
    this.state = {
      animationIcon: playArrow
    }
    this.updateLayerStore = this.updateLayerStore.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 6,
        minZoom: 6,
        maxBounds: [[24.8, -108], [37.5, -92]]
      })

      this.map.zoomControl.setPosition('topright')
      this.map.attributionControl.setPrefix('Data Sourced From')
      this.initializeLayerStore(this.props, this.map)
      this.initializeBasemapLayers()
      this.initializeGeocoderControl()
      this.initializeSimulateFloodControl()
    }, 0)

    this.setState({
      flooded: false
    })
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

  updateLayerStore() {
    this.setState({
      flooded: !this.state.flooded
    })

    let sqlRef = SQL

    if (this.state.flooded === true) {
        sqlRef = demoSQL
    }

    const newProps = objectAssign({}, this.props, {
        featureLayers: { layers:
          this.props.featureLayers.layers.map((layer) => {
            if (layer.id == 'ahps-flood') {
              return objectAssign({}, layer, {
                options: {
                  'refreshTimeMs': 300000, // 5 minutes
                  'account': 'tnris-flood',
                  'sql': sqlRef,
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
        if (layer.hasOwnProperty('_url')) {
            const gageLayerExt = layer._url.includes('json')
            if (gageLayerExt) {
                this.map.removeLayer(layer)
            }
        }
    })

    this.initializeLayerStore(newProps, this.map);

    if (this.state.flooded === true) {
      FloodAlerts.checkStage('tnris-flood');
    }

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
      geocoder: L.Control.Geocoder.bing(keys.bingApiKey)
    })

    //override the default markGeocode method
    // so that a marker is not added to the map
    control.markGeocode = (result) => {
      this.map.fitBounds(result.bbox)
    }

    control.addTo(this.map)
  }

  initializeSimulateFloodControl() {
      const toggleFloodAction = this.updateLayerStore;
      const toggleFlood = L.easyButton({
          type: 'animate',
          position: 'topright',
          states: [{
              stateName: 'real-time-data',
              icon: '&bcong; &backcong;&#x0224C;&#8780;',
              title: 'Simulate Flood',
              onClick: function(control){
                  toggleFloodAction();
                  control.state('simulate-flood');
              }
          }, {
              stateName: 'simulate-flood',
              icon: '&bcong; &backcong;&#x0224C;&#8780;',
              title: 'Show Current Data',
              onClick: function(control){
                  toggleFloodAction();
                  control.state('real-time-data');
              }
          }]
      });

      toggleFlood.addTo(this.map);
  }

  toggleAnimation() {
    this.layerStore.get('animated-weather').toggleAnimation()
    if (this.layerStore.get('animated-weather').animate === true) {
      this.setState({animationIcon: pause})
    }
    else {
      this.setState({animationIcon: playArrow})
    }
  }
  
  betaNotice() {
      if (document.URL === 'http://map.texasflood.org/') {
          return "hide-beta"
      } else {
          return "betanotice"
      }
  }

  render() {
    let radarInfo
    if (this.displayedTimestamp != '') {
      radarInfo =  <FABButton mini onClick={() => {this.toggleAnimation()}}><img src={this.state.animationIcon} /></FABButton>      
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
