import L from 'leaflet'
import objectAssign from 'object-assign'

import * as types from '../actions/types'

const initialState = {
  layers: [
    {
      'id': 'osm',
      'text': 'OpenStreetMap',
      'type': 'tile',
      'url': 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    {
      'id': 'positron',
      'text': 'Positron',
      'type': 'tile',
      'url': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }
    },
    {
      'id': 'dark-matter',
      'text': 'Dark Matter',
      'type': 'tile',
      'url': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }
    },
    {
      'id': 'bing-road',
      'text': 'Bing Road',
      'type': 'bing',
      'options': {
        'type': 'Road'
      }
    },
    {
      'id': 'bing-aerial',
      'text': 'Bing Aerial',
      'type': 'bing',
      'options': {
        'type': 'Aerial'
      }
    },
    {
      'id': 'tx-goog',
      'text': 'Texas Google Imagery',
      'type': 'wmts',
      'url': 'https://txgi.tnris.org/login/path/spoon-java-neuron-nebula/wmts/',
      'options': {
        'layer': 'texas',
        'style': 'default',
        'tilematrixSet': '0to20',
        'format': 'image/png',
        'version': '1.0.0',
        'serviceMode': 'KVP',
        'bounds': L.latLngBounds([[25.601902, -107.050781], [36.633162, -93.208007]]),
        'attribution': 'Imagery &copy; 2016 Google'
      }
    }
  ],
  active: 'positron'
}

export default function baseLayers(state = initialState, action) {
  switch (action.type) {
    case types.SET_BASE_LAYER:
      return objectAssign({}, state, {
        active: action.id
      })
    default:
      return state
  }
}
