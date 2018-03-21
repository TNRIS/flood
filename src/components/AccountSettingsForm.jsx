import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Modal from 'react-modal'


const reactModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    border: null,
    borderRadius: null
  }
}

import FloodAppUser from '../util/User'


/** Form for creating a new user account and beginning the verification process */
class AccountSettingsForm extends Component {
  static propTypes = {
    allSubscriptions: PropTypes.array,
    deleteAccount: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleOpenConfirmDialog = this.handleOpenConfirmDialog.bind(this)
    this.handleCloseConfirmDialog = this.handleCloseConfirmDialog.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  handleOpenConfirmDialog() {
    this.setState({
      openConfirmDialog: true
    })
  }

  handleCloseConfirmDialog() {
    this.setState({
      openConfirmDialog: false
    })
  }

  deleteAccount() {
    this.props.deleteAccount()
  }

  toggleAlertTypes(event) {
    const att = event.target.id == "currentAlerts" ? "custom:currentAlerts" : "custom:predictiveAlerts"
    const value = event.target.checked == true ? "T" : "F"
    FloodAppUser.updateAlertAttribute(att, value)
  }

  render() {
    let profile = FloodAppUser.userData
    const email = profile.email ? profile.email : (<i>No email on file</i>)
    const alertCurrent = profile['custom:currentAlerts'] === "T" ? true : false
    const alertPredictive = profile['custom:predictiveAlerts'] === "T" ? true : false

    const deleteAccountButton = () => {
      let button
      if (this.props.allSubscriptions.length === 0) {
        button = (
          <div className="delete-button-container">
            <button type="button" className="button delete-account"
            onClick={this.handleOpenConfirmDialog}>DELETE MY ACCOUNT</button>
          </div>
        )
      }
      else {
        button = (
          <div className="delete-button-container">
            <p>Please unsubscribe from all gages before deleting your account.</p>
            <button disabled type="button" className="button delete-account-disabled"
            onClick={this.handleOpenConfirmDialog}>DELETE MY ACCOUNT</button>
          </div>
        )
      }
      return button
    }

    return (
      <div>
        <div className="user-settings">
          <p><b>Current User Profile</b></p>
          <p><b>Username:</b> { FloodAppUser.cognitoUser.username }</p>
          <p><b>Phone:</b> { profile.phone_number.substring(2).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") }</p>
          <p><b>Email:</b> { email }</p>
          <div>
            <p className="switch-label"><b>Flood Gage Significant Stage Alert Types:</b></p>
            <table className="responsive-card-table unstriped">
              <tbody>
                <tr>
                  <td>
                    <div className="switch-container shrink" title="Receive significant current gage stage alerts"><small>Current</small>
                      <div className="switch tiny">
                        <input className="switch-input"
                          id="currentAlerts"
                          type="checkbox"
                          name="currentAlerts"
                          defaultChecked={alertCurrent}
                          onChange={(event) => this.toggleAlertTypes(event)}/>
                        <label className="switch-paddle" htmlFor="currentAlerts">
                          <span className="show-for-sr"></span>
                        </label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="switch-container shrink" title="Receive significant predictive gage stage alerts"><small>Predictive</small>
                      <div className="switch tiny">
                        <input className="switch-input"
                         id="predictiveAlerts"
                         type="checkbox"
                         name="predictiveAlerts"
                         defaultChecked={alertPredictive}
                         onChange={(event) => this.toggleAlertTypes(event)}/>
                        <label className="switch-paddle" htmlFor="predictiveAlerts">
                         <span className="show-for-sr"></span>
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <span>
          {deleteAccountButton()}
        </span>
        </div>
        <Modal className="confirm-delete-account"
               isOpen={this.state.openConfirmDialog}
               contentLabel="Confirm Changes Modal"
               style={reactModalStyle}>
          <div className="card">
            <div className="card-divider confirm-modal-title">
              <i className="fi-alert"></i>
              <span>Confirm Delete</span>
            </div>
            <div className="card-section confirm-modal-text">Are you sure you want to delete your account?
            Once deleted, your account cannot be recovered.</div>
            <div className="confirm-modal-actions">
              <button type="button" className="button" onClick={this.deleteAccount}>Confirm</button>
              <button autoFocus="true" type="button" className="button" onClick={this.handleCloseConfirmDialog}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AccountSettingsForm
