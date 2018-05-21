import { expect } from 'chai'

import reducer from '../gageInfo'
import { SET_GAGE_INIT } from '../../constants/MapActionTypes'

describe('reducer: gageInfo', () => {
  const sampleInfo = {
    lid: "DVL2",
    name: "Devil near Lake of Fire",
    stage: "Drowning"
  }

  it('should return the initial state as an empty object', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle SET_GAGE_INIT to set blank gage info as replicated from argument', () => {

    expect(
      reducer({}, {
        type: SET_GAGE_INIT,
        initState: sampleInfo
      })).to.deep.equal(sampleInfo)
  })

  it('should handle SET_GAGE_INIT to set preset gage info as replicated from argument', () => {
    const sampleInfo2 = {
      lid: "SVR1",
      name: "Savior on North Side of River Styx",
      stage: "Floating"
    }

    expect(
      reducer(sampleInfo, {
        type: SET_GAGE_INIT,
        initState: sampleInfo2
      })).to.deep.equal(sampleInfo2)
  })

})
