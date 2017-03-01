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
      return objectAssign({}, state, {
        email: action.email,
        phone: action.phone
      })
    default:
      return state
  }
}
