import { expect } from 'chai'

import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM,
  SUBSCRIPTION_UPDATED,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../../constants/SubscriptionChangeActionTypes'

import {
  addSubscribeToChangeList,
  addUnsubscribeToChangeList,
  subscriptionUpdated,
  unqueueChangeFromChangeList,
  saveSubscriptionChanges
} from '../SubscriptionChangeActions'


describe('actions: SubscriptionChangeActions', () => {
  const sampleLid = 'UDET2'
  const sampleProtocol = 'sms'

  it('should create an action to add a new subscription to the store change list', () => {
    const expectedAction = {
      type: ADD_SUBSCRIBE_TO_CHANGE_LIST,
      payload: {
        id: `${sampleLid}_${sampleProtocol}_subscribe`,
        lid: sampleLid,
        protocol: sampleProtocol,
        subscriptionId: null,
        subscriptionAction: "SUBSCRIBE",
        changeRequestId: null
      }
    }
    expect(addSubscribeToChangeList(sampleLid, sampleProtocol)).to.deep.equal(expectedAction)
  })

  it('should create an action to add an unsubscription to the store change list', () => {
    const sampleSubscriptionId = 666
    const expectedAction = {
      type: ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
      payload: {
        id: `${sampleLid}_${sampleProtocol}_unsubscribe`,
        lid: sampleLid,
        protocol: sampleProtocol,
        subscriptionId: sampleSubscriptionId,
        subscriptionAction: "UNSUBSCRIBE",
        changeRequestId: null
      }
    }
    expect(addUnsubscribeToChangeList(sampleLid, sampleProtocol, sampleSubscriptionId)).to.deep.equal(expectedAction)
  })

  it('should create an action to queue a subscription change/update', () => {
    const sampleSubscriptionChangeId = 666
    const sampleChangeRequestId = 999
    const expectedAction = {
      type: SUBSCRIPTION_UPDATED,
      payload: {
        id: sampleSubscriptionChangeId,
        changeRequestId: sampleChangeRequestId
      }
    }
    expect(subscriptionUpdated(sampleSubscriptionChangeId, sampleChangeRequestId)).to.deep.equal(expectedAction)
  })

  it('should create an action to unqueue a subscription change/update', () => {
    const sampleAction = 'subscribe'
    const expectedAction = {
      type: UNQUEUE_CHANGE_FROM_CHANGE_LIST,
      payload: {
        id: `${sampleLid}_${sampleProtocol}_${sampleAction}`
      }
    }
    expect(unqueueChangeFromChangeList(sampleLid, sampleProtocol, sampleAction)).to.deep.equal(expectedAction)
  })

  it('should create an action to return a function for firing the queued subscription changes', () => {
    // this test can be elaborated to deep dive into the function itself
    // but that requires mock functions for getState() and dispatch
    expect(saveSubscriptionChanges()).to.be.a('function')
  })

})
