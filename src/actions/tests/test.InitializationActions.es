import { expect } from 'chai'

import {
  retrieveGageStatus
} from '../InitializationActions'

describe('actions: InitializationActions', () => {

  it('should create an action with a dispatchable function to show the about modal', () => {
    const initialGages = retrieveGageStatus()
    const dp = function dispatch (t) {
      return
    }

    expect(retrieveGageStatus()).to.be.a('function')
    expect(initialGages(dp)).to.be.a('promise')
  })

})
