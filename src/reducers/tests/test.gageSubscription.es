import objectAssign from 'object-assign'
import { expect } from 'chai'

import {
  ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
  CLEAR_SUBSCRIPTION_LIST
} from '../../constants/SubscriptionListActionTypes'

import {
  gageSubscriptionById,
  allGageSubscriptions,
  displayGageSubscriptions
} from '../gageSubscription'

describe('reducer: gageSubscription', () => {
  const sampleLid = "DVL2"
  const sampleProtocol = "sms"
  const sampleId = 666

  const sampleSubscription = { DVL2: { sms: 666, lid: 'DVL2' } }
  const sampleSubscription2 = { SVR1: { sms: 111, lid: 'SVR1' } }

  it('should return the initial gageSubscriptionById state as an empty object', () => {
    expect(
      gageSubscriptionById(undefined, {})
    ).to.deep.equal({})
  })

  it('empty gageSubscriptionById should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      gageSubscriptionById({}, {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid,
          protocol: sampleProtocol,
          id: sampleId
        }
      })
    ).to.deep.equal(sampleSubscription)
  })

  it('preset gageSubscriptionById should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      gageSubscriptionById(sampleSubscription2, {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid,
          protocol: sampleProtocol,
          id: sampleId
        }
      })
    ).to.deep.equal(objectAssign({}, sampleSubscription2, sampleSubscription))
  })

})
