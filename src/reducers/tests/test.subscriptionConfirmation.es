import { expect } from 'chai'

import {
  SHOW_SUBSCRIPTION_CONFIRMATION,
  HIDE_SUBSCRIPTION_CONFIRMATION
} from '../../constants/SubscribeActionTypes'

import reducer from '../subscriptionConfirmation'

describe('reducer: subscriptionConfirmation', () => {
  it('default should return the initial showConfirmation state as false', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({showConfirmation: false})
  })

  it('hidden subscriptionConfirmation should handle SHOW_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      reducer({showConfirmation: false}, {
        type: SHOW_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: true})
  })

  it('visible subscriptionConfirmation should handle SHOW_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      reducer({showConfirmation: true}, {
        type: SHOW_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: true})
  })

  it('hidden subscriptionConfirmation should handle HIDE_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      reducer({showConfirmation: false}, {
        type: HIDE_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: false})
  })

  it('visible subscriptionConfirmation should handle HIDE_SUBSCRIPTION_CONFIRMATION', () => {
    expect(
      reducer({showConfirmation: true}, {
        type: HIDE_SUBSCRIPTION_CONFIRMATION
      })
    ).to.deep.equal({showConfirmation: false})
  })

})
