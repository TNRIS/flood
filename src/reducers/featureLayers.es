import objectAssign from 'object-assign'

import { CHANGE_LAYER_STATUS_ACTION, SET_FEATURE_LAYER_ACTION } from '../actions'

const floodCartoCSS = require('../cartodb/nws-ahps-gauges-texas.mss')
const floodSQL = require('../cartodb/nws-ahps-gauges-texas.sql')
const reservoirCartoCSS = require('../cartodb/reservoir-conditions.mss')
const reservoirSQL = require('../cartodb/reservoir-conditions.sql')

const boatIcon = require('../images/boat_icon.png')
const floodGaugeIcon = require('../images/flood_gauge_icon.png')
const weatherIcon = require('../images/weather_icon.png')

const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gauges',
      'type': 'cartodb',
      'icon': floodGaugeIcon,
      'options': {
        'sql': floodSQL,
        'interactivity': [
          'lid',
          'name',
          'hydrograph_image',
          'hydrograph_link',
        ],
        'cartocss': floodCartoCSS,

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
      'id': 'reservoir-conditions',
      'text': 'Lake Conditions',
      'icon': boatIcon,
      'type': 'cartodb',
      'options': {
        'sql': reservoirSQL,
        'interactivity': [
          'full_name',
          'lake_condensed_name',
          'flood_height_percent',
          'conservation_pool_elevation',
          'top_of_dam_elevation',
        ],
        'cartocss': reservoirCartoCSS,
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
    case CHANGE_LAYER_STATUS_ACTION:
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
    case SET_FEATURE_LAYER_ACTION:
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

