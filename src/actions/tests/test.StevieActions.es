import { expect } from 'chai'

import {
  sendErrorReport
} from '../StevieActions'

describe('actions: StevieActions', () => {
  const sampleErrorText = 'Does not compute. So awkward!'
  it('Stevie should send the error text to AWS SNS', () => {
    expect(sendErrorReport(sampleErrorText)).to.be.a('function')
  })
  // TODO: Add a test that offers a more robust check
})
