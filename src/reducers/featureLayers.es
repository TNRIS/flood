import objectAssign from 'object-assign'

import * as types from '../actions/types'

const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
const floodSQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const reservoirCartoCSS = require('../cartodb/reservoir-conditions.mss')
const reservoirSQL = require('../cartodb/reservoir-conditions.sql')

const floodGaugeIcon = require('../images/flood_gauge_icon.png')
const floodGaugeLegend = require('../images/nws-ahps-gauges-texas-legend.png')
const floodAlertIcon = require('../images/flood_alert_red.png')
const lakeIcon = require('../images/boat_icon.png')
const lakeLegend = require('../images/reservoir-conditions-legend.png')
const rainIcon = require('../images/rain_icon.png')
const weatherIcon = require('../images/weather_icon.png')

const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'type': 'cartodb',
      'icon': floodGaugeIcon,
      'legend': floodGaugeLegend,
      'options': {
        'refreshTimeMs': 300000, // 5 minutes
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
      'id': 'flood-alerts',
      'text': 'Weather Alerts',
      'icon': floodAlertIcon,
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
      'id': 'reservoir-conditions',
      'text': 'Lake Conditions',
      'icon': lakeIcon,
      'legend': lakeLegend,
      'type': 'cartodb',
      'options': {
        'refreshTimeMs': 1800000, // 30 minutes
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
    }
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
    default:
      return state
  }
}
