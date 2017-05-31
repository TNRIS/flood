import expect from 'expect'

import {
  CLEAR_POPUP,
  SET_POPUP
} from '../../constants/PopupActionTypes'

import reducer from '../popupData'

describe('reducer: popupData', () => {
  const samplePayload = {
    clickLocation: {},
    data: {},
    id: 'ahps-flood'
  }
  it('should return the initial state of the popupData', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should return empty object when CLEAR_POPUP action sent', () => {
    expect(
      reducer([], {
        type: CLEAR_POPUP
      })
    ).toEqual({})
  })

  it('should return the popup data object when SET_POPUP is called with data', () => {
    expect(
      reducer([], {
        type: SET_POPUP,
        payload: samplePayload
      })
    ).toEqual(samplePayload)
  })
})
