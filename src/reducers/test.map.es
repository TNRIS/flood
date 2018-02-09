import { expect } from 'chai'
import * as R from 'ramda'

import reducer from './map'
import * as types from '../constants/MapActionTypes'

describe('reducer: map', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({
      mapCenterLat: null,
      mapCenterLng: null,
      zoomLevel: null
    })
  })

  it('should handle CLEAR_CENTER_AND_ZOOM when map has state', () => {
    expect(
      reducer({
        mapCenterLat: 30.2672,
        mapCenterLng: 97.7431,
        zoomLevel: 16
      }, {
        type: types.CLEAR_CENTER_AND_ZOOM
      })).to.deep.equal({
        mapCenterLat: null,
        mapCenterLng: null,
        zoomLevel: null
      })
  })

  it('should handle SET_CENTER_AND_ZOOM when map changes', () => {
    expect(
      reducer({
        mapCenterLat: 30.2672,
        mapCenterLng: 97.7431,
        zoomLevel: 16
      }, {
        type: types.SET_CENTER_AND_ZOOM,
        lat: -666,
        lng: 666,
        zoom: -5
      })).to.deep.equal({
        mapCenterLat: -666,
        mapCenterLng: 666,
        zoomLevel: -5
      })
  })
})
