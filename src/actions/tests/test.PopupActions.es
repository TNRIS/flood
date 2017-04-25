import expect from 'expect'

import {
  CLEAR_POPUP,
  POPUP_IMAGE_LOAD_ATTEMPT,
  POPUP_IMAGE_LOAD_SUCCESS,
  SET_POPUP
} from '../../constants/PopupActionTypes'

import {
  clearPopup,
  popupImageLoadAttempt,
  popupImageLoadSuccess,
  setPopup
} from '../PopupActions'


describe('PopupActions', () => {
  it('should create an action to remove popup content', () => {
    const expectedAction = {
      type: CLEAR_POPUP
    }
    expect(clearPopup()).toEqual(expectedAction)
  })

  it('should create an action to indicate attempt to load a popup image', () => {
    const expectedAction = {
      type: POPUP_IMAGE_LOAD_ATTEMPT,
      payload: {
        loaded: false
      }
    }
    expect(popupImageLoadAttempt()).toEqual(expectedAction)
  })

  it('should create an action to indicate a successful load of a popup image', () => {
    const expectedAction = {
      type: POPUP_IMAGE_LOAD_SUCCESS,
      payload: {
        loaded: true
      }
    }
    expect(popupImageLoadSuccess()).toEqual(expectedAction)
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

    expect(setPopup(popupData)).toEqual(expectedAction)
  })
})
