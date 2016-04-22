import expect from 'expect'

import * as types from './types'
import * as actions from './'

describe('actions', () => {
  it('should create an action to change layer status', () => {
    const id = 'hi'
    const status = 'ready'

    const expectedAction = {
      type: types.CHANGE_LAYER_STATUS,
      id,
      status
    }
    expect(actions.layerStatusChange(id, status)).toEqual(expectedAction)
  })

  it('should create an action for hovering over clickable part of map', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: types.HOVER_OVER_MAP_CLICKABLE,
      data
    }
    expect(actions.hoverOverMapClickable(data)).toEqual(expectedAction)
  })

  it('should create an action for setting base layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: types.SET_BASE_LAYER,
      id
    }
    expect(actions.setBaseLayer(id)).toEqual(expectedAction)
  })

  it('should create an action for setting feature layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: types.SET_FEATURE_LAYER,
      id
    }
    expect(actions.setFeatureLayer(id)).toEqual(expectedAction)
  })

  it('should create an action for setting a popup when defined', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: types.SET_POPUP,
      payload: data
    }
    expect(actions.setPopup(data)).toEqual(expectedAction)
  })

  it('should create an action for setting a popup when undefined', () => {
    const expectedAction = {
      type: types.SET_POPUP,
      payload: undefined
    }
    expect(actions.setPopup()).toEqual(expectedAction)
  })
})
