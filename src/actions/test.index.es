import { expect } from 'chai'

import * as types from './types'
import * as actions from './'

import {
  SET_POPUP
} from '../constants/PopupActionTypes'

import {
  setPopup
} from './PopupActions'

describe('actions', () => {
  it('should create an action to change layer status', () => {
    const id = 'hi'
    const status = 'ready'

    const expectedAction = {
      type: types.CHANGE_LAYER_STATUS,
      id,
      status
    }
    expect(actions.layerStatusChange(id, status)).to.deep.equal(expectedAction)
  })

  it('should create an action for hovering over clickable part of map', () => {
    const data = {'test': 'foo'}

    const expectedAction = {
      type: types.HOVER_OVER_MAP_CLICKABLE,
      data
    }
    expect(actions.hoverOverMapClickable(data)).to.deep.equal(expectedAction)
  })

  it('should create an action for setting base layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: types.SET_BASE_LAYER,
      id
    }
    expect(actions.setBaseLayer(id)).to.deep.equal(expectedAction)
  })

  it('should create an action for setting feature layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: types.SET_FEATURE_LAYER,
      id
    }
    expect(actions.setFeatureLayer(id)).to.deep.equal(expectedAction)
  })
})
