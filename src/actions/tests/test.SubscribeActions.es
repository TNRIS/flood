import expect from 'expect'

import {
  confirmSubscription,
  subscribeGage
} from '../SubscribeActions'


describe('actions: SubscribeActions', () => {
  const samplePhone = '0118 999 881 999 119 725 3'
  const sampleLid = 'UDET2'

  it('Action to send a confirmation on successful subscription', () => {
    expect(confirmSubscription(samplePhone, sampleLid)).toBeA('function')
  })
})
