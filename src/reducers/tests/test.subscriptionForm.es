import { expect } from 'chai'

import {
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  NO_SUBSCRIPTIONS_FOUND,
  DISPLAY_FORM
} from '../../constants/SubscriptionFormActionTypes'

import reducer from '../subscriptionForm'

describe('reducer: subscriptionForm', () => {
  const initialState = {
    error: null,
    isFetching: false,
    nextToken: null,
    displayForm: "login"
  }

  const sampleState = {
    error: null,
    isFetching: true,
    nextToken: null,
    displayForm: "login"
  }

  it('default should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  it('subscriptionForm should handle GET_SUBSCRIPTIONS_ATTEMPT', () => {
    expect(
      reducer(initialState, {
        type: GET_SUBSCRIPTIONS_ATTEMPT
      })
    ).to.deep.equal(sampleState)
  })

})
