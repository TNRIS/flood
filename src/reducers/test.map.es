import expect from 'expect'
import R from 'ramda'


import reducer from './map'
import * as types from '../actions/types'



describe('reducer: map', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should handle SET_POPUP when one is not set', () => {
    expect(
      reducer({}, {
        type: types.SET_POPUP,
        payload: 'hi there'
      })
    ).toEqual({
      popup: 'hi there'
    })
  })

  it('should handle SET_POPUP when one already exists', () => {
    expect(
      reducer({
        popup: 'hi there'
      }, {
        type: types.SET_POPUP,
        payload: 'bye there'
      })
    ).toEqual({
      popup: 'bye there'
    })
  })

  it('should handle SET_POPUP when popup exists and payload is undefined', () => {
    expect(
      reducer({
        popup: 'hi there'
      }, {
        type: types.SET_POPUP,
        payload: undefined
      })
    ).toEqual({
    })
  })

  it('should handle HOVER_OVER_MAP_CLICKABLE when one is not set', () => {
    expect(
      reducer({}, {
        type: types.HOVER_OVER_MAP_CLICKABLE,
        data: {
          coordinates: [32, 11.2],
          text: 'hovering!'
        }
      })
    ).toEqual({
      hoveringOver: {
        coordinates: [32, 11.2],
        text: 'hovering!'
      }
    })
  })

  it('should handle HOVER_OVER_MAP_CLICKABLE when one already exists', () => {
    expect(
      reducer({
        hoveringOver: {
          coordinates: [32, 11.2],
          text: 'hovering!'
        }
      }, {
        type: types.HOVER_OVER_MAP_CLICKABLE,
        data: {
          coordinates: [19, 100],
          text: 'hovering new!'
        }
      })
    ).toEqual({
      hoveringOver: {
        coordinates: [19, 100],
        text: 'hovering new!'
      }
    })
  })
})
