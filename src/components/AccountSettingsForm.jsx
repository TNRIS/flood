import React, { Component, PropTypes } from 'react'
import { Button } from 'react-mdl'
import FloodAppUser from '../util/User'

/** Form for creating a new user account and beginning the verification process */
class AccountSettingsForm extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    let profile = FloodAppUser.userData
    let email
    if (profile.email) {
      email = (
          profile.email
        )
    }
    else {
      email = (
          <i>No email on file</i>
        )
    }


    return (
      <div className="user__settings">
        <p><b>Current User Profile</b></p>
        <p><b>Username:</b> { FloodAppUser.cognitoUsername }</p>
        <p><b>Phone:</b> { profile.phone_number.substring(2) }</p>
        <p><b>Email:</b> { email }</p>
      </div>
    )
  }
}

export default AccountSettingsForm
