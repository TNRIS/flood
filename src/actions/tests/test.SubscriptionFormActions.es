import { expect } from 'chai'

import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS
} from '../../constants/SubscriptionFormActionTypes'

import {
  clearSubscriptions,
  getSubscriptionsAttempt,
  getSubscriptionsError,
  getSubscriptionsSuccess,
  getUserSubscriptions
} from '../SubscriptionFormActions'


describe('actions: SubscriptionFormActions', () => {
  it('should create and action to clear subscriptions from the store', () => {
    const expectedAction = {
      type: CLEAR_SUBSCRIPTIONS
    }
    expect(clearSubscriptions()).to.deep.equal(expectedAction)
  })
  it('should create an action that attempt to retrieve user subscriptions has begun', () => {
    const expectedAction = {
      type: GET_SUBSCRIPTIONS_ATTEMPT
    }
    expect(getSubscriptionsAttempt()).to.deep.equal(expectedAction)
  })
  it('should create an action that indicates an error in retrieving the user subscriptions', () => {
    const sampleError = "Jen, you broke the internet!"
    const expectedAction = {
      type: GET_SUBSCRIPTIONS_ERROR,
      error: sampleError
    }
    expect(getSubscriptionsError(sampleError)).to.deep.equal(expectedAction)
  })
  it('should create an action that indicates success in retrieving the user\'s subscriptions', () => {
    const expectedAction = {
      type: GET_SUBSCRIPTIONS_SUCCESS
    }
    expect(getSubscriptionsSuccess()).to.deep.equal(expectedAction)
  })
  it('should return a function (thunk) to retrieve the user\'s subscriptions', () => {
    expect(getUserSubscriptions()).to.be.a('function')
  })
})
