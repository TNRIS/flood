import { expect } from 'chai'

import {
  CLEAR_POPUP,
  SET_POPUP
} from '../../constants/PopupActionTypes'

import {
  clearPopup,
  setPopup
} from '../PopupActions'


describe('actions: PopupActions', () => {
  it('should create an action to remove popup content', () => {
    const expectedAction = {
      type: CLEAR_POPUP
    }
    expect(clearPopup()).to.deep.equal(expectedAction)
  })

  it('should create an action for setting a popup when defined', () => {
    const popupData = {
      clickLocation: [32, -101],
      data: {
        full_name: "Lake Nasworthy"
      },
      id: "reservoir-conditions"
    }

    const {id, data, clickLocation} = popupData
    const expectedAction = {
      type: SET_POPUP,
      payload: {
        id,
        data,
        clickLocation
      }
    }

    expect(setPopup(popupData)).to.deep.equal(expectedAction)
  })
})
