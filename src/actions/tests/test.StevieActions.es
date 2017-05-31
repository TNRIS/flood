import expect from 'expect'

import {
  sendErrorReport
} from '../StevieActions'

describe('actions: StevieActions', () => {
  const sampleErrorText = 'Does not compute. So awkward!'
  it('Stevie should send the error text to AWS SNS', () => {
    expect(sendErrorReport(sampleErrorText)).toBeA('function')
  })
  // TODO: Add a test that offers a more robust check
})
