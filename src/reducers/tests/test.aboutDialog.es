import { expect } from 'chai'
import * as R from 'ramda'

import reducer from '../aboutDialog'
import {
  SHOW_ABOUT_DIALOG,
  HIDE_ABOUT_DIALOG
} from '../../constants/AboutActionTypes'

describe('reducer: aboutDialog', () => {
  it('should return the initial state with the open setting as false', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({
      openDialog: false
    })
  })

  it('should handle SHOW_ABOUT_DIALOG to open the dialog if closed', () => {
    expect(
      reducer({
        openDialog: false
        }, {
        type: SHOW_ABOUT_DIALOG
      })).to.deep.equal({
        openDialog: true
      })
  })

  it('should handle HIDE_ABOUT_DIALOG to close the dialog if open', () => {
    expect(
      reducer({
        openDialog: true
        }, {
        type: HIDE_ABOUT_DIALOG
      })).to.deep.equal({
        openDialog: false
      })
  })

  it('should handle SHOW_ABOUT_DIALOG to keep the dialog open if already', () => {
    expect(
      reducer({
        openDialog: true
        }, {
        type: SHOW_ABOUT_DIALOG
      })).to.deep.equal({
        openDialog: true
      })
  })

  it('should handle HIDE_ABOUT_DIALOG to keep the dialog closed if already', () => {
    expect(
      reducer({
        openDialog: false
        }, {
        type: HIDE_ABOUT_DIALOG
      })).to.deep.equal({
        openDialog: false
      })
  })

})
