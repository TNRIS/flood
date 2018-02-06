import { expect } from 'chai'
import * as R from 'ramda'

import reducer from './featureLayers'
import * as types from '../actions/types'

// extract important (more easily testable) version of layers from state
const extractImportant = state => {
  let copy = Object.assign({}, state)
  copy.layers = copy.layers.map(layer => {
    return R.pick([
      'id',
      'text',
      'type',
      'active',
      'status'
    ], layer)
  })

  return copy
}


describe('reducer: featureLayers', () => {
  it('should return the initial state', () => {
    expect(
      extractImportant(reducer(undefined, {}))
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': true,
          'status': null,
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': false,
          'status': null,
        }
      ]
    })
  })

  it('should handle CHANGE_LAYER_STATUS when changing status', () => {
    expect(
      reducer({
        layers: [
          {
            'id': 'ahps-flood',
            'text': 'Flood Gages',
            'type': 'cartodb',
            'active': true,
            'status': null,
          },
          {
            'id': 'reservoir-conditions',
            'text': 'Lake Conditions',
            'type': 'cartodb',
            'active': false,
            'status': null,
          },
          {
            'id': 'flood-alerts',
            'text': 'Weather Alerts',
            'type': 'aeris-alerts',
            'active': false,
            'status': null,
          },
          {
            'id': 'animated-weather',
            'text': 'Weather Radar',
            'type': 'animated-weather',
            'active': false,
            'status': 'ready',
          }
        ]
      }, {
        type: types.CHANGE_LAYER_STATUS,
        id: 'ahps-flood',
        status: 'pending',
      })
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': true,
          'status': 'pending',
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': false,
          'status': 'ready',
        }
      ]
    })
  })

  it('should handle CHANGE_LAYER_STATUS when status does not change', () => {
    expect(
      reducer({
        layers: [
          {
            'id': 'ahps-flood',
            'text': 'Flood Gages',
            'type': 'cartodb',
            'active': true,
            'status': 'pending',
          },
          {
            'id': 'reservoir-conditions',
            'text': 'Lake Conditions',
            'type': 'cartodb',
            'active': false,
            'status': null,
          },
          {
            'id': 'flood-alerts',
            'text': 'Weather Alerts',
            'type': 'aeris-alerts',
            'active': false,
            'status': null,
          },
          {
            'id': 'animated-weather',
            'text': 'Weather Radar',
            'type': 'animated-weather',
            'active': false,
            'status': 'ready',
          }
        ]
      }, {
        type: types.CHANGE_LAYER_STATUS,
        id: 'ahps-flood',
        status: 'pending',
      })
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': true,
          'status': 'pending',
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': false,
          'status': 'ready',
        }
      ]
    })
  })

  it('should handle SET_FEATURE_LAYER when changing layers', () => {
    expect(
      reducer({
        layers: [
          {
            'id': 'ahps-flood',
            'text': 'Flood Gages',
            'type': 'cartodb',
            'active': true,
            'status': 'ready',
          },
          {
            'id': 'reservoir-conditions',
            'text': 'Lake Conditions',
            'type': 'cartodb',
            'active': false,
            'status': null,
          },
          {
            'id': 'flood-alerts',
            'text': 'Weather Alerts',
            'type': 'aeris-alerts',
            'active': false,
            'status': null,
          },
          {
            'id': 'animated-weather',
            'text': 'Weather Radar',
            'type': 'animated-weather',
            'active': false,
            'status': 'ready',
          }
        ]
      }, {
        type: types.SET_FEATURE_LAYER,
        id: 'animated-weather',
      })
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': true,
          'status': 'ready',
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': true,
          'status': 'ready',
        }
      ]
    })
  })

  it('should handle SET_FEATURE_LAYER to deactivate already active layer', () => {
    expect(
      reducer({
        layers: [
          {
            'id': 'ahps-flood',
            'text': 'Flood Gages',
            'type': 'cartodb',
            'active': true,
            'status': 'ready',
          },
          {
            'id': 'reservoir-conditions',
            'text': 'Lake Conditions',
            'type': 'cartodb',
            'active': false,
            'status': null,
          },
          {
            'id': 'flood-alerts',
            'text': 'Weather Alerts',
            'type': 'aeris-alerts',
            'active': false,
            'status': null,
          },
          {
            'id': 'animated-weather',
            'text': 'Weather Radar',
            'type': 'animated-weather',
            'active': true,
            'status': 'ready',
          }
        ]
      }, {
        type: types.SET_FEATURE_LAYER,
        id: 'ahps-flood',
      })
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': false,
          'status': 'ready',
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': true,
          'status': 'ready',
        }
      ]
    })
  })

  it('should handle UPDATE_TIMESTAMP for animated-weather layer', () => {
    expect(
      reducer({
        layers: [
          {
            'id': 'ahps-flood',
            'text': 'Flood Gages',
            'type': 'cartodb',
            'active': true,
            'status': 'ready',
          },
          {
            'id': 'reservoir-conditions',
            'text': 'Lake Conditions',
            'type': 'cartodb',
            'active': false,
            'status': null,
          },
          {
            'id': 'flood-alerts',
            'text': 'Weather Alerts',
            'type': 'aeris-alerts',
            'active': false,
            'status': null,
          },
          {
            'id': 'animated-weather',
            'text': 'Weather Radar',
            'type': 'animated-weather',
            'active': true,
            'status': 'ready',
            'displayedTimestamp': ''
          }
        ]
      }, {
        type: types.UPDATE_TIMESTAMP,
        timestamp: '20180125225'
      })
    ).to.deep.equal({
      layers: [
        {
          'id': 'ahps-flood',
          'text': 'Flood Gages',
          'type': 'cartodb',
          'active': true,
          'status': 'ready',
        },
        {
          'id': 'reservoir-conditions',
          'text': 'Lake Conditions',
          'type': 'cartodb',
          'active': false,
          'status': null,
        },
        {
          'id': 'flood-alerts',
          'text': 'Weather Alerts',
          'type': 'aeris-alerts',
          'active': false,
          'status': null,
        },
        {
          'id': 'animated-weather',
          'text': 'Weather Radar',
          'type': 'animated-weather',
          'active': true,
          'status': 'ready',
          'displayedTimestamp': '20180125225'
        }
      ]
    })
  })
})
