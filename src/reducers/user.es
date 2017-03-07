import objectAssign from 'object-assign'

import {
  SET_USER_INFO
} from '../constants/UserInfoActionTypes'

const initialState = {
  email: '',
  phone: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      const emailAddress = action.email || initialState.email
      const phoneNumber = action.phone || initialState.phone
      return objectAssign({}, state, {
        email: emailAddress,
        phone: phoneNumber
      })
    default:
      return state
  }
}
