import { expect } from 'chai'

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
    ).to.deep.equal({})
  })

  it('should return the popup data object when SET_POPUP is called on empty reducer', () => {
    expect(
      reducer(undefined, {
        type: SET_POPUP,
        payload: samplePayload
      })
    ).to.deep.equal(samplePayload)
  })

  it('should return empty object when CLEAR_POPUP action sent', () => {
    expect(
      reducer(samplePayload, {
        type: CLEAR_POPUP
      })
    ).to.deep.equal({})
  })

  it('should return the popup data object when SET_POPUP is called on populated reducer', () => {
    expect(
      reducer({
        clickLocation: {click: 'location'},
        data: {lotsOf: 'information'},
        id: 'flood-alerts'
      }, {
        type: SET_POPUP,
        payload: samplePayload
      })
    ).to.deep.equal(samplePayload)
  })

  it('should return cleared popup state when SET_POPUP payload is undefined', () => {
    expect(
      reducer(samplePayload, {
        type: SET_POPUP
      })
    ).to.deep.equal({})
  })
})
