import L from 'leaflet'
import objectAssign from 'object-assign'

import * as types from '../actions/types'

const initialState = {
  layers: [
    {
      'id': 'mapbox-outdoors',
      'text': 'Mapbox Outdoors',
      'type': 'tile',
      'url': 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidC1mYWwiLCJhIjoiY2lnMnFqNDN0MWVseXVrbTVoanRtMnQ5cyJ9.Dej5tFgaK38wrj6a4HVSxA',
      'options': {
        'attribution': '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        'mapbox': true
      }
    },
    {
      'id': 'osm',
      'text': 'OpenStreetMap',
      'type': 'tile',
      'url': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    {
      'id': 'positron',
      'text': 'Positron',
      'type': 'tile',
      'url': 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }
    },
    {
      'id': 'dark-matter',
      'text': 'Dark Matter',
      'type': 'tile',
      'url': 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
      // 'url': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
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
  active: 'mapbox-outdoors'
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
