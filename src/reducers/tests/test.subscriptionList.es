import objectAssign from 'object-assign'
import { expect } from 'chai'

import {
  UPDATE_SUBSCRIPTIONS_ATTEMPT,
  UPDATE_SUBSCRIPTIONS_ERROR,
  UPDATE_SUBSCRIPTIONS_SUCCESS,
} from '../../constants/SubscriptionListActionTypes'

import {
  SHOW_USER_SETTINGS
} from '../../constants/UserActionTypes'

import reducer from '../subscriptionList'

describe('reducer: subscriptionList', () => {
  const initialState = {
    error: null,
    isUpdating: false,
    view: "SubscriptionList"
  }

  const sampleState = {
    error: null,
    isUpdating: true,
    view: "Carpe Diem Baby"
  }

  it('default should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  it('subscriptionList should handle UPDATE_SUBSCRIPTIONS_ATTEMPT', () => {
    expect(
      reducer(sampleState, {
        type: UPDATE_SUBSCRIPTIONS_ATTEMPT
      })
    ).to.deep.equal(objectAssign({}, sampleState, {
      isUpdating: true,
      view: "Spinner"
    }))
  })

  it('subscriptionList should handle UPDATE_SUBSCRIPTIONS_ERROR', () => {
    const sampleError = "UGH! More problems?!?!?"
    const sampleOutput = {
      error: sampleError,
      isUpdating: false,
      view: "SubscriptionList"
    }

    expect(
      reducer(sampleState, {
        type: UPDATE_SUBSCRIPTIONS_ERROR,
        error: sampleError
      })
    ).to.deep.equal(sampleOutput)
  })

  it('subscriptionList should handle UPDATE_SUBSCRIPTIONS_SUCCESS with initial state', () => {
    expect(
      reducer(sampleState, {
        type: UPDATE_SUBSCRIPTIONS_SUCCESS
      })
    ).to.deep.equal(initialState)
  })

  it('subscriptionList should handle SHOW_USER_SETTINGS', () => {
    const sampleOutput = {
      error: null,
      isUpdating: true,
      view: "UserSettings"
    }

    expect(
      reducer(sampleState, {
        type: SHOW_USER_SETTINGS
      })
    ).to.deep.equal(sampleOutput)
  })

})
