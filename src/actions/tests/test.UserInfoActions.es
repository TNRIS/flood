import expect from 'expect'

import {
  SET_USER_INFO
} from '../../constants/UserInfoActionTypes'

import {
  setUserInfo
} from '../UserInfoActions'

describe('actions: UserInfoActions', () => {
  const sampleEmail = 'moss@renholmindustries.com'
  const samplePhone = '0118 999 881 999 119 725 3'

  it('should set the user\'s info', () => {
    const expectedAction = {
      type: SET_USER_INFO,
      email: sampleEmail,
      phone: samplePhone
    }
    expect(setUserInfo(sampleEmail, samplePhone)).toEqual(expectedAction)
  })
})
