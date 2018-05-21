import objectAssign from 'object-assign'
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
    nextToken: '654sdf684wef123sefs',
    displayForm: "testForm"
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
    ).to.deep.equal(objectAssign({}, initialState, {
      isFetching: true
    }))
  })

  it('subscriptionForm should handle GET_SUBSCRIPTIONS_ERROR', () => {
    const sampleError = "Ugh! Problems!!"
    const sampleOutput = objectAssign({}, initialState, {
      error: sampleError,
      isFetching: false,
      nextToken: null,
      displayForm: sampleState.displayForm
    })

    expect(
      reducer(sampleState, {
        type: GET_SUBSCRIPTIONS_ERROR,
        error: sampleError
      })
    ).to.deep.equal(sampleOutput)
  })

  it('subscriptionForm should handle GET_SUBSCRIPTIONS_SUCCESS', () => {
    const sampleOutput = objectAssign({}, initialState, {
      error: null,
      isFetching: false,
      nextToken: null,
      displayForm: sampleState.displayForm
    })

    expect(
      reducer(sampleState, {
        type: GET_SUBSCRIPTIONS_SUCCESS
      })
    ).to.deep.equal(sampleOutput)
  })

  it('subscriptionForm should handle DISPLAY_FORM', () => {
    const sampleOutput = objectAssign({}, sampleState, {
      displayForm: 'anyOldFormName'
    })

    expect(
      reducer(sampleState, {
        type: DISPLAY_FORM,
        form: 'anyOldFormName'
      })
    ).to.deep.equal(sampleOutput)
  })

  it('subscriptionForm should handle NO_SUBSCRIPTIONS_FOUND', () => {
    const sampleOutput = objectAssign({}, sampleState, {
      displayForm: "noSubscriptions",
      isFetching: false
    })

    expect(
      reducer(sampleState, {
        type: NO_SUBSCRIPTIONS_FOUND
      })
    ).to.deep.equal(sampleOutput)
  })

})
