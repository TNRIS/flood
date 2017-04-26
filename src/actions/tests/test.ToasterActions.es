import expect from 'expect'

import {
  HIDE_SNACKBAR,
  SHOW_SNACKBAR
} from '../../constants/ToasterActionTypes'

import {
  hideSnackbar,
  showSnackbar
} from '../ToasterActions'


describe('ToasterActions', () => {
  const sampleText = "Toast with yesterday's Jam"
  const sampleTimeout = 2000
  const defaultTimeout = 2750

  it('should create an action to hide the snackbar', () => {
    const expectedAction = {
      type: HIDE_SNACKBAR
    }
    expect(hideSnackbar()).toEqual(expectedAction)
  })
  it('should create an action to show the snackbar when timeout is defined', () => {
    const expectedAction = {
      type: SHOW_SNACKBAR,
      payload: {
        snackbarText: sampleText,
        snackbarTimeout: sampleTimeout
      }
    }
    expect(showSnackbar(sampleText, sampleTimeout)).toEqual(expectedAction)
  })
  it('should create an action to show the snackbar when timeout is undefined', () => {
    const expectedAction = {
      type: SHOW_SNACKBAR,
      payload: {
        snackbarText: sampleText,
        snackbarTimeout: defaultTimeout
      }
    }
    expect(showSnackbar(sampleText)).toEqual(expectedAction)
  })
})
