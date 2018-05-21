import { expect } from 'chai'

import {
  showAboutDialog,
  hideAboutDialog
} from '../AboutActions'

describe('actions: AboutActions', () => {

  it('should create an action with a dispatchable function to show the about modal', () => {
    expect(showAboutDialog()).to.be.a('function')
  })

  it('should create an action with a dispatchable function to hide the about modal', () => {
    expect(hideAboutDialog()).to.be.a('function')
  })

})
