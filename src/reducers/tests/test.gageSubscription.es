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

  const sampleLid2 = "SVR1"

  const sampleLidPred = "DVL2--PD"
  const sampleLidPred2 = "SVR1--PD"

  const sampleSubscription = { DVL2: { sms: 666, lid: 'DVL2' } }
  const sampleSubscription2 = { SVR1: { sms: 111, lid: 'SVR1' } }
  const sampleList = objectAssign({}, sampleSubscription2, sampleSubscription)

  // gageSubscriptionById tests
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
    ).to.deep.equal(sampleList)
  })

  it('preset gageSubscriptionById should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST with duplicates', () => {
    expect(
      gageSubscriptionById(sampleList, {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid,
          protocol: sampleProtocol,
          id: sampleId
        }
      })
    ).to.deep.equal(sampleList)
  })

  it('empty gageSubscriptionById should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      gageSubscriptionById({}, {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal({})
  })

  it('preset gageSubscriptionById should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      gageSubscriptionById(sampleSubscription2, {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal({})
  })

  // allGageSubscriptions tests
  it('should return the initial allGageSubscriptions state as an empty array', () => {
    expect(
      allGageSubscriptions(undefined, {})
    ).to.deep.equal([])
  })

  it('empty allGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      allGageSubscriptions([], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid
        }
      })
    ).to.deep.equal([sampleLid])
  })

  it('preset allGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      allGageSubscriptions([sampleLid2], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid
        }
      })
    ).to.deep.equal([sampleLid, sampleLid2])
  })

  it('preset allGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST with duplicates', () => {
    expect(
      allGageSubscriptions([sampleLid, sampleLid2], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLid
        }
      })
    ).to.deep.equal([sampleLid, sampleLid2])
  })

  it('empty allGageSubscriptions should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      allGageSubscriptions([], {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal([])
  })

  it('preset allGageSubscriptions should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      allGageSubscriptions([sampleLid, sampleLid2], {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal([])
  })

  // displayGageSubscriptions tests
  it('should return the initial displayGageSubscriptions state as an empty array', () => {
    expect(
      displayGageSubscriptions(undefined, {})
    ).to.deep.equal([])
  })

  it('empty displayGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      displayGageSubscriptions([], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLidPred
        }
      })
    ).to.deep.equal([sampleLid])
  })

  it('preset displayGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST', () => {
    expect(
      displayGageSubscriptions([sampleLid2], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLidPred
        }
      })
    ).to.deep.equal([sampleLid, sampleLid2])
  })

  it('preset displayGageSubscriptions should handle ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST with duplicates', () => {
    expect(
      displayGageSubscriptions([sampleLid, sampleLid2], {
        type: ADD_SUBSCRIPTION_TO_SUBSCRIPTION_LIST,
        payload: {
          lid: sampleLidPred
        }
      })
    ).to.deep.equal([sampleLid, sampleLid2])
  })

  it('empty displayGageSubscriptions should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      displayGageSubscriptions([], {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal([])
  })

  it('preset displayGageSubscriptions should handle CLEAR_SUBSCRIPTION_LIST', () => {
    expect(
      displayGageSubscriptions([sampleLid, sampleLid2], {
        type: CLEAR_SUBSCRIPTION_LIST
      })
    ).to.deep.equal([])
  })

})
