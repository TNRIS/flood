import L from 'leaflet'
import objectAssign from 'object-assign'

import * as types from '../actions/types'
import keys from '../keys'

const initialState = {
  layers: [
    {
      'id': 'esri-world-streetmap',
      'text': 'Streets',
      'type': 'tile',
      'url': `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}`,
      'options': {
        'attribution': 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        'detectRetina': false,
        'layerId': 'esri-world-streetmap'
      }
    },
    {
      'id': 'bing-hybrid',
      'text': 'Hybrid',
      'type': 'bing',
      'options': {
        'type': 'AerialWithLabels',
        'layerId': 'bing-hybrid'
      }
    },
    {
      'id': 'tx-goog',
      'text': 'Satellite',
      'type': 'wmts',
      'url': 'https://txgi.tnris.org/login/path/spoon-java-neuron-nebula/wmts/',
      'options': {
        'layerId': 'tx-goog',
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
  active: 'esri-world-streetmap',
  target: 'basemap-context-menu'
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
