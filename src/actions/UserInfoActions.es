import { SET_USER_INFO } from '../constants/UserInfoActionTypes'


export function setUserInfo(email, phone) {
  return {
    type: SET_USER_INFO,
    email,
    phone
  }
}
