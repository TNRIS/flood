import objectAssign from 'object-assign'

import { SET_FEATURE_LAYER_TYPE, LAYER_STATUS_CHANGE_TYPE } from '../actions'

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
        'name': 'ahps-flood',
      },
      'active': true,
    },
    {
      'id': 'animated-weather',
      'text': 'Weather Radar',
      'icon': weatherIcon,
      'type': 'animated-weather',
      'active': false,
    },
    {
      'id': 'reservoir-conditions',
      'text': 'Lake Conditions',
      'icon': boatIcon,
      'type': 'cartodb',
      'options': {
        'name': 'wdft-reservoirs',
      },
      'active': false,
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
    case SET_FEATURE_LAYER_TYPE:
      return objectAssign({}, state, {
        layers: state.layers.map((layer) => {
          return objectAssign({}, layer, {
            active: layer.id === action.id
          })
        })
      })
      return objectAssign({}, state, {
        layers: updatedLayers
      })
    default:
      return state
  }
}

