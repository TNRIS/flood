import expect from 'expect'
import * as R from 'ramda'


import reducer from './baseLayers'
import * as types from '../actions/types'



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
    ).toEqual({
      active: 'positron',
      layers: [
        {
          'id': 'osm',
          'text': 'OpenStreetMap',
          'type': 'tile',
        },
        {
          'id': 'positron',
          'text': 'Positron',
          'type': 'tile',
        },
        {
          'id': 'dark-matter',
          'text': 'Dark Matter',
          'type': 'tile',
        },
        {
          'id': 'bing-road',
          'text': 'Bing Road',
          'type': 'bing',
        },
        {
          'id': 'bing-aerial',
          'text': 'Bing Aerial',
          'type': 'bing',
        },
        {
          'id': 'tx-goog',
          'text': 'Texas Google Imagery',
          'type': 'wmts',
        },
      ]
    })
  })

  it('should handle SET_BASE_LAYER when changing base layer', () => {
    expect(
      reducer({
        active: 'positron',
        layers: [
          {
            'id': 'osm',
            'text': 'OpenStreetMap',
            'type': 'tile',
          },
          {
            'id': 'positron',
            'text': 'Positron',
            'type': 'tile',
          },
          {
            'id': 'dark-matter',
            'text': 'Dark Matter',
            'type': 'tile',
          },
          {
            'id': 'bing-road',
            'text': 'Bing Road',
            'type': 'bing',
          },
          {
            'id': 'bing-aerial',
            'text': 'Bing Aerial',
            'type': 'bing',
          },
          {
            'id': 'tx-goog',
            'text': 'Texas Google Imagery',
            'type': 'wmts',
          },
        ]
      }, {
        type: types.SET_BASE_LAYER,
        id: 'dark-matter',
      })).toEqual({
        active: 'dark-matter',
        layers: [
          {
            'id': 'osm',
            'text': 'OpenStreetMap',
            'type': 'tile',
          },
          {
            'id': 'positron',
            'text': 'Positron',
            'type': 'tile',
          },
          {
            'id': 'dark-matter',
            'text': 'Dark Matter',
            'type': 'tile',
          },
          {
            'id': 'bing-road',
            'text': 'Bing Road',
            'type': 'bing',
          },
          {
            'id': 'bing-aerial',
            'text': 'Bing Aerial',
            'type': 'bing',
          },
          {
            'id': 'tx-goog',
            'text': 'Texas Google Imagery',
            'type': 'wmts',
          },
        ]
      })
  })

  it('should handle SET_BASE_LAYER when base layer does not change', () => {
    expect(
      reducer({
        active: 'positron',
        layers: [
          {
            'id': 'osm',
            'text': 'OpenStreetMap',
            'type': 'tile',
          },
          {
            'id': 'positron',
            'text': 'Positron',
            'type': 'tile',
          },
          {
            'id': 'dark-matter',
            'text': 'Dark Matter',
            'type': 'tile',
          },
          {
            'id': 'bing-road',
            'text': 'Bing Road',
            'type': 'bing',
          },
          {
            'id': 'bing-aerial',
            'text': 'Bing Aerial',
            'type': 'bing',
          },
          {
            'id': 'tx-goog',
            'text': 'Texas Google Imagery',
            'type': 'wmts',
          },
        ]
      }, {
        type: types.SET_BASE_LAYER,
        id: 'positron',
      })).toEqual({
        active: 'positron',
        layers: [
          {
            'id': 'osm',
            'text': 'OpenStreetMap',
            'type': 'tile',
          },
          {
            'id': 'positron',
            'text': 'Positron',
            'type': 'tile',
          },
          {
            'id': 'dark-matter',
            'text': 'Dark Matter',
            'type': 'tile',
          },
          {
            'id': 'bing-road',
            'text': 'Bing Road',
            'type': 'bing',
          },
          {
            'id': 'bing-aerial',
            'text': 'Bing Aerial',
            'type': 'bing',
          },
          {
            'id': 'tx-goog',
            'text': 'Texas Google Imagery',
            'type': 'wmts',
          },
        ]
      })
  })

})
