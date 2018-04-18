import { expect } from 'chai'

import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS
} from '../../constants/SubscriptionListActionTypes'

import {
  addSubscriptionToSubscriptionList,
  clearSubscriptionList,
  updateSubscriptionsAttempt,
  updateSubscriptionsError,
  updateSubscriptionsSuccess
} from '../SubscriptionListActions'


describe('actions: SubscriptionListActions', () => {

  it("should create an action to add a new subscription to the user's subscription list", () => {
    let nextSubscriptionId = 0
    const sampleLid = 'UDET2'
    const sampleProtocol = 'sms'
    const sampleEndpoint = '+11234567890'

    const expectedAction = {
      type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
      payload: {
        id: nextSubscriptionId++,
        lid: sampleLid,
        subscription: sampleLid,
        protocol: sampleProtocol,
        endpoint: sampleEndpoint
      }
    }
    expect(addSubscriptionToSubscriptionList(sampleLid, sampleLid, sampleProtocol, sampleEndpoint)).to.deep.equal(expectedAction)
  })

  it("should create an action to clear out the user's subscription list", () => {
    const expectedAction = {
      type: CLEAR_SUBSCRIPTION_LIST
    }
    expect(clearSubscriptionList()).to.deep.equal(expectedAction)
  })

  it("should create an action to change status of user's subscription list as updating attempt", () => {
    const expectedAction = {
      type: UPDATE_SUBSCRIPTIONS_ATTEMPT
    }
    expect(updateSubscriptionsAttempt()).to.deep.equal(expectedAction)
  })

  it("should create an action to change status of user's subscription list as an error", () => {
    const sampleError = 'Ugh!'
    const expectedAction = {
      type: UPDATE_SUBSCRIPTIONS_ERROR,
      error: sampleError
    }
    expect(updateSubscriptionsError(sampleError)).to.deep.equal(expectedAction)
  })

  it("should create an action to change status of user's subscription list as successful", () => {
    const expectedAction = {
      type: UPDATE_SUBSCRIPTIONS_SUCCESS
    }
    expect(updateSubscriptionsSuccess()).to.deep.equal(expectedAction)
  })

})
