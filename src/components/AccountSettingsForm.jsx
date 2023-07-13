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
    this.state = {
      currentAlerts: FloodAppUser.userData['custom:currentAlerts'],
      predictiveAlerts: FloodAppUser.userData['custom:predictiveAlerts'],
      iUnderstand: false
    }
    this.initCurrent = FloodAppUser.userData['custom:currentAlerts']
    this.initPredictive = FloodAppUser.userData['custom:predictiveAlerts']
    this.handleOpenConfirmDialog = this.handleOpenConfirmDialog.bind(this)
    this.handleCloseConfirmDialog = this.handleCloseConfirmDialog.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
    this.saveAttributeChanges = this.saveAttributeChanges.bind(this)
  }

  handleOpenConfirmDialog(event) {
    if (event.target.id === 'delete') {
      this.setState({
        openConfirmDialog: true,
        confirmIcon: "fa fa-trash-o",
        confirmHeader: "Delete My Account",
        confirmText: (<p>Are you sure you want to delete your account?<br /><b>Once deleted, your account cannot be recovered.</b></p>),
        confirmClick: this.deleteAccount
      })
    }
    else if (event.target.id === 'save') {
      this.setState({
        openConfirmDialog: true,
        confirmIcon: "fa fa-floppy-o",
        confirmHeader: "Save Changes",
        confirmText: (<p>Are you sure you want to change your alert types?<br />This will alter the SMS messages you receive.<br /><b>Disabling both will cause you to lose all of your subscriptions.</b></p>),
        confirmClick: this.saveAttributeChanges
      })
    }
  }

  handleCloseConfirmDialog() {
    this.setState({
      openConfirmDialog: false,
      iUnderstand: false
    })
  }

  deleteAccount() {
    this.props.deleteAccount()
  }

  saveAttributeChanges() {
    this.initCurrent = this.state.currentAlerts
    this.initPredictive = this.state.predictiveAlerts
    FloodAppUser.updateAlertAttributes(this.state.currentAlerts, this.state.predictiveAlerts)
    this.handleCloseConfirmDialog()
  }

  toggleAlertTypes(event) {
    const value = event.target.checked == true ? "T" : "F"
    const obj = {}
    obj[event.target.id] = value
    this.setState(obj)
  }

  toggleUnderstand(event) {
    this.setState({
      iUnderstand: event.target.checked
    })
  }

  render() {
    let profile = FloodAppUser.userData
    const email = profile.email ? profile.email : (<i>No email on file</i>)
    const alertCurrent = profile['custom:currentAlerts'] === "T" ? true : false
    const alertPredictive = profile['custom:predictiveAlerts'] === "T" ? true : false

    const saveButton = () => {
      let save
      if (this.initCurrent != this.state.currentAlerts || this.initPredictive != this.state.predictiveAlerts) {
        save = (
          <button id="save" type="button"
            className="button attribute-change-save-button"
            onClick={this.handleOpenConfirmDialog}>SAVE CHANGES</button>
        )
      }
      else {
        save = (
          <button type="button" disabled
            className="button attribute-change-save-button">SAVE CHANGES</button>
        )
      }
      return save
    }

    const deleteAccountButton = () => {
      let button
      if (this.props.allSubscriptions.length === 0) {
        button = (
          <div className="delete-button-container">
            <button id="delete" type="button" className="button delete-account"
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

    const confirmChangeButton = () => {
      let confirmChangeButton
      if (this.state.iUnderstand) {
        confirmChangeButton = (<button type="button" className="button" onClick={this.state.confirmClick}>Confirm</button>)
      }
      else {
        confirmChangeButton = (<button disabled type="button" className="button" onClick={this.state.confirmClick}>Confirm</button>)
      }
      return confirmChangeButton
    }

    return (
      <div>
        <div className="user-settings">
          <h5>Account Settings</h5>
          <p><b>Username:</b> { FloodAppUser.cognitoUser.username }</p>
          <p><b>Phone:</b> { profile.phone_number ? profile.phone_number.substring(2).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") : ""}</p>
          <p><b>Email:</b> { email ? email : "" }</p>
          <div>
            <p className="switch-label"><b>Flood Gage Alert Types:</b></p>
            <table className="responsive-card-table unstriped">
              <tbody>
                <tr>
                  <td>
                    <div className="switch-container shrink" title="Receive current significant stage alerts"><small>Current</small>
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
                    <div className="switch-container shrink" title="Receive predictive significant stage alerts"><small>Predictive</small>
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
          {saveButton()}
        </span>
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
              <i className={this.state.confirmIcon}></i>
              <span>{this.state.confirmHeader}</span>
            </div>
            <div className="card-section confirm-modal-text">
              {this.state.confirmText}
              <div className="switch-container shrink">
                <div id="i-understand-switch" className="switch tiny" title="I Understand">
                  <input className="switch-input"
                   id="iUnderstand"
                   type="checkbox"
                   name="iUnderstand"
                   onChange={(event) => this.toggleUnderstand(event)}/>
                  <label className="switch-paddle" htmlFor="iUnderstand">
                   <span className="show-for-sr"></span>
                  </label>
                </div>
                <label id="i-understand-switch-label" htmlFor="iUnderstand" title="I Understand">I Understand</label>
              </div>
            </div>
            <div className="confirm-modal-actions">
              {confirmChangeButton()}
              <button autoFocus={true} type="button" className="button" onClick={this.handleCloseConfirmDialog}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AccountSettingsForm
