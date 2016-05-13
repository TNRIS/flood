import objectAssign from 'object-assign'

import * as types from '../actions/types'

const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
const floodSQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const reservoirCartoCSS = require('../cartodb/reservoir-conditions.mss')
const reservoirSQL = require('../cartodb/reservoir-conditions.sql')

const boatIcon = require('../images/boat_icon.png')
const floodGaugeIcon = require('../images/flood_gauge_icon.png')
const floodAlertIcon = require('../images/flood_alert_red.png')
const rainIcon = require('../images/rain_icon.png')
const weatherIcon = require('../images/weather_icon.png')

const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'type': 'cartodb',
      'icon': floodGaugeIcon,
      'options': {
        'account': 'tnris-flood',
        'sql': floodSQL,
        'interactivity': [
          'lid',
          'name',
          'wfo',
        ],
        'cartocss': floodCartoCSS,
        'attribution': '<a href="http://water.weather.gov/ahps/">NOAA National Weather Service</a>',
      },
      'active': true,
      'status': null,
    },
    {
      'id': 'animated-weather',
      'text': 'Weather Radar',
      'icon': weatherIcon,
      'type': 'animated-weather',
      'active': false,
      'status': null,
    },
    {
      'id': 'future-rain',
      'text': 'Rain Forecast',
      'icon': rainIcon,
      'type': 'aeris-tile',
      'options': {
        'code': 'fqpf-nam4k',
        'refreshTimeMs': 300000, // 5 minutes
        'opacity': 0.7
      },
      'active': false,
      'status': null,
    },
    {
      'id': 'flood-alerts',
      'text': 'Weather Alerts',
      'icon': floodAlertIcon,
      'type': 'aeris-alerts',
      'options': {
        'code': 'alerts',
        'refreshTimeMs': 300000, // 5 minutes
        'opacity': 0.7
      },
      'active': false,
      'status': null,
    },
    {
      'id': 'reservoir-conditions',
      'text': 'Lake Conditions',
      'icon': boatIcon,
      'type': 'cartodb',
      'options': {
        'account': 'tnris',
        'sql': reservoirSQL,
        'interactivity': [
          'full_name',
          'lake_url_name',
          'flood_height_percent',
          'conservation_pool_elevation',
          'top_of_dam_elevation',
        ],
        'cartocss': reservoirCartoCSS,
        'attribution': '<a href="http://waterdatafortexas.org/">WaterDataForTexas.org</a>',
      },
      'active': false,
      'status': null,
    },
    //TODO: Removed until Aeris subscription has been purchased
    // since their advisory layers don't work under the dev plan
    // {
    //   'id': 'flood-alerts',
    //   'text': 'Flood Alerts',
    //   'type': 'flood-alerts',
    //   'active': false,
    // },
  ],
}

export default function featureLayers(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_LAYER_STATUS:
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
    case types.SET_FEATURE_LAYER:
      return objectAssign({}, state, {
        layers: state.layers.map((layer) => {
          return objectAssign({}, layer, {
            active: layer.id === action.id
          })
        })
      })
    default:
      return state
  }
}

