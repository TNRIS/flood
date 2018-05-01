import objectAssign from 'object-assign'
import { expect } from 'chai'

import {
  SHOW_SUBSCRIPTION_CONFIRMATION,
  HIDE_SUBSCRIPTION_CONFIRMATION
} from '../../constants/SubscribeActionTypes'

import subscriptionConfirmation from '../subscriptionConfirmation'

describe('reducer: subscriptionConfirmation', () => {
  it('default should return the initial showConfirmation state as false', () => {
    expect(
      subscriptionConfirmation(undefined, {})
    ).to.deep.equal({showConfirmation: false})
  })

  it('hidden subscriptionConfirmation should handle SHOW_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      subscriptionConfirmation({showConfirmation: false}, {
        type: SHOW_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: true})
  })

  it('visible subscriptionConfirmation should handle SHOW_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      subscriptionConfirmation({showConfirmation: true}, {
        type: SHOW_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: true})
  })

  it('hidden subscriptionConfirmation should handle HIDE_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      subscriptionConfirmation({showConfirmation: false}, {
        type: HIDE_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: false})
  })

  it('visible subscriptionConfirmation should handle HIDE_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      subscriptionConfirmation({showConfirmation: true}, {
        type: HIDE_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: false})
  })

})
