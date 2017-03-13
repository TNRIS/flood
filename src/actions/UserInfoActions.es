import { SET_USER_INFO } from '../constants/UserInfoActionTypes'

/**
 * Action to add/update the user email and phone number in the store
 * @param {string} email user email from form input
 * @param {string} phone user phone from form input
 */
export function setUserInfo(email, phone) {
  return {
    type: SET_USER_INFO,
    email,
    phone
  }
}
