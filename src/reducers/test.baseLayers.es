import { expect } from 'chai'
import * as R from 'ramda'

import reducer from './baseLayers'
import { SET_BASE_LAYER } from '../constants/MapActionTypes'

// extract important (more easily testable) version of layers from state
const extractImportant = state => {
  let copy = Object.assign({}, state)
  copy.layers = copy.layers.map(layer => {
    return R.pick([
      'id',
      'text',
      'type',
    ], layer)
  })

  return copy
}


describe('reducer: baseLayers', () => {
  it('should return the initial state', () => {
    expect(
      extractImportant(reducer(undefined, {}))
    ).to.deep.equal({
      active: 'esri-world-streetmap',
      target: 'basemap-context-menu',
      layers: [
        {
          'id': 'esri-world-streetmap',
          'text': 'Streets',
          'type': 'tile'
        },
        {
          'id': 'bing-hybrid',
          'text': 'Hybrid',
          'type': 'bing'
        },
        {
          'id': 'tx-goog',
          'text': 'Satellite',
          'type': 'wmts'
        },
      ]
    })
  })

  it('should handle SET_BASE_LAYER when changing base layer', () => {
    expect(
      reducer({
        active: 'esri-world-streetmap',
        layers: [
          {
            'id': 'esri-world-streetmap',
            'text': 'Streets',
            'type': 'tile'
          },
          {
            'id': 'bing-hybrid',
            'text': 'Hybrid',
            'type': 'bing'
          },
          {
            'id': 'tx-goog',
            'text': 'Satellite',
            'type': 'wmts'
          },
        ]
      }, {
        type: SET_BASE_LAYER,
        id: 'bing-hybrid',
      })).to.deep.equal({
        active: 'bing-hybrid',
        layers: [
          {
            'id': 'esri-world-streetmap',
            'text': 'Streets',
            'type': 'tile'
          },
          {
            'id': 'bing-hybrid',
            'text': 'Hybrid',
            'type': 'bing'
          },
          {
            'id': 'tx-goog',
            'text': 'Satellite',
            'type': 'wmts'
          },
        ]
      })
  })

  it('should handle SET_BASE_LAYER when base layer does not change', () => {
    expect(
      reducer({
        active: 'bing-hybrid',
        layers: [
          {
            'id': 'esri-world-streetmap',
            'text': 'Streets',
            'type': 'tile'
          },
          {
            'id': 'bing-hybrid',
            'text': 'Hybrid',
            'type': 'bing'
          },
          {
            'id': 'tx-goog',
            'text': 'Satellite',
            'type': 'wmts'
          },
        ]
      }, {
        type: SET_BASE_LAYER,
        id: 'bing-hybrid',
      })).to.deep.equal({
        active: 'bing-hybrid',
        layers: [
          {
            'id': 'esri-world-streetmap',
            'text': 'Streets',
            'type': 'tile'
          },
          {
            'id': 'bing-hybrid',
            'text': 'Hybrid',
            'type': 'bing'
          },
          {
            'id': 'tx-goog',
            'text': 'Satellite',
            'type': 'wmts'
          },
        ]
      })
  })

})
