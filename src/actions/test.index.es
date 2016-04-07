import expect from 'expect'

import * as actions from './'

describe('actions', () => {
  it('should create an action to change layer status', () => {
    const id = 'hi'
    const status = 'ready'

    const expectedAction = {
      type: actions.CHANGE_LAYER_STATUS_ACTION,
      id,
      status
    }
    expect(actions.layerStatusChange(id, status)).toEqual(expectedAction)
  })

  it('should create an action for hovering over clickable part of map', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: actions.HOVER_OVER_MAP_CLICKABLE_ACTION,
      data
    }
    expect(actions.hoverOverMapClickable(data)).toEqual(expectedAction)
  })

  it('should create an action for setting base layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: actions.SET_BASE_LAYER_ACTION,
      id
    }
    expect(actions.setBaseLayer(id)).toEqual(expectedAction)
  })

  it('should create an action for setting feature layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: actions.SET_FEATURE_LAYER_ACTION,
      id
    }
    expect(actions.setFeatureLayer(id)).toEqual(expectedAction)
  })

  it('should create an action for opening a popup', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: actions.OPEN_POPUP_ACTION,
      data
    }
    expect(actions.openPopup(data)).toEqual(expectedAction)
  })

  it('should create an action for closeing a popup', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: actions.CLOSE_POPUP_ACTION,
      data
    }
    expect(actions.closePopup(data)).toEqual(expectedAction)
  })
})
