import objectAssign from 'object-assign'

import {
  CHANGE_LAYER_STATUS,
  SET_FEATURE_LAYER,
  UPDATE_TIMESTAMP
} from '../constants/MapActionTypes'

const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
const floodSQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const reservoirCartoCSS = require('../cartodb/reservoir-conditions.mss')
const reservoirSQL = require('../cartodb/reservoir-conditions.sql')

const floodGaugeIcon = require('../images/flood_gauge_icon.png')
const floodGaugeLegend = require('../images/nws-ahps-gauges-texas-legend.png')
const floodAlertIcon = require('../images/flood_alert_red.png')
const floodAlertLegend = require('../images/flood-alert-legend.png')
const lakeIcon = require('../images/boat_icon.png')
const lakeLegend = require('../images/reservoir-conditions-legend.png')
const rainIcon = require('../images/rain_icon.png')
const weatherIcon = require('../images/weather_icon.png')
const weatherLegend = require('../images/animated-weather-legend_800x450.png')

const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'type': 'cartodb',
      'icon': floodGaugeIcon,
      'altText': 'Flood Gage Icon',
      'legend': floodGaugeLegend,
      'options': {
        'refreshTimeMs': 300000, // 5 minutes
        'account': 'tnris-flood',
        'sql': floodSQL.default,
        'interactivity': [
          'lid',
          'name',
          'wfo',
        ],
        'cartocss': floodCartoCSS.default,
        'attribution': '<a href="http://water.weather.gov/ahps/">NOAA National Weather Service</a>',
      },
      'active': true,
      'status': null,
    },
    {
      'id': 'reservoir-conditions',
      'text': 'Lake Conditions',
      'icon': lakeIcon,
      'altText': 'Lake Icon',
      'legend': lakeLegend,
      'type': 'cartodb',
      'options': {
        'refreshTimeMs': 1800000, // 30 minutes
        'account': 'tnris-flood',
        'sql': reservoirSQL.default,
        'interactivity': [
          'full_name',
          'lake_url_name',
          'flood_height_percent',
          'conservation_pool_elevation',
          'top_of_dam_elevation',
        ],
        'cartocss': reservoirCartoCSS.default,
        'attribution': '<a href="http://waterdatafortexas.org/">WaterDataForTexas.org</a>',
      },
      'active': false,
      'status': null,
    },
    {
      'id': 'flood-alerts',
      'text': 'Weather Alerts',
      'icon': floodAlertIcon,
      'altText': 'Flood Alert Icon',
      'legend': floodAlertLegend,
      'type': 'aeris-alerts',
      'options': {
        'code': 'alerts',
        'refreshTimeMs': 60000, // 1 minute
        'opacity': 0.7
      },
      'active': false,
      'status': null,
    },
    {
      'id': 'animated-weather',
      'text': 'Weather Radar',
      'icon': weatherIcon,
      'altText': 'Weather Icon',
      'legend': weatherLegend,
      'type': 'animated-weather',
      'active': false,
      'status': null,
      'displayedTimestamp': '',
    }
  ],
}

export default function featureLayers(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LAYER_STATUS:
      return objectAssign({}, state, {
        layers: state.layers.map((layer) => {
          let newLayer
          if (layer.id === action.id) {
            newLayer = objectAssign({}, layer, {
              status: action.status
            })
          }
          else {
            newLayer = layer
          }
          return newLayer
        })
      })
    case SET_FEATURE_LAYER:
      return objectAssign({}, state, {
        layers: state.layers.map((layer) => {
          let newLayer

          // This allows us to turn multiple layers on at the same time
          if (layer.id === action.id) {
            newLayer = objectAssign({}, layer, {
              active: !layer.active
            })
          }
          else {
            newLayer = layer
          }
          return newLayer
        })
      })
    case UPDATE_TIMESTAMP:
      return objectAssign({}, state, {
        layers: state.layers.map((layer) => {
          let newLayer
          if (layer.id === 'animated-weather') {
            newLayer = objectAssign({}, layer, {
              displayedTimestamp: action.timestamp
            })
          }
          else {
            newLayer = layer
          }
          return newLayer
        })
      })
    default:
      return state
  }
}
