import { expect } from 'chai'

import {
  showSubscriptionConfirmation,
  hideSubscriptionConfirmation,
  confirmSubscription,
  subscribeGage
} from '../SubscribeActions'


describe('actions: SubscribeActions', () => {
  const samplePhone = '0118 999 881 999 119 725 3'
  const sampleLid = 'UDET2'
  const dp = function dispatch (t) {
    return
  }

  it('Action to show the subscription confirmation modal', () => {
    expect(showSubscriptionConfirmation()).to.be.a('function')
  })

  it('Action to hide the subscription confirmation modal', () => {
    expect(hideSubscriptionConfirmation()).to.be.a('function')
  })

  it('Action to send a confirmation on successful subscription', () => {
    expect(confirmSubscription(samplePhone, sampleLid)).to.be.a('function')
  })

  it('Action to subscribe a user to a gage', () => {
    expect(subscribeGage(sampleLid, true)).to.be.a('function')
  })

})
