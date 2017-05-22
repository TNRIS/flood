import React, { Component, PropTypes } from 'react'
import { Button, Card, CardTitle, CardText, CardActions } from 'react-mdl'

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

    const deleteAccountButton = () => {
      let button
      if (this.props.allSubscriptions.length === 0) {
        button = (
          <div style={{marginTop: "30px"}}>
            <Button raised
            style={{background: "#c0392b", color: "white", width: "100%"}}
            onClick={this.handleOpenConfirmDialog}>DELETE MY ACCOUNT</Button>
          </div>
        )
      }
      else {
        button = (
          <div style={{marginTop: "30px"}}>
            <p>Please unsubscribe from all gages before deleting your account.</p>
            <Button raised disabled
            style={{width: "100%"}}
            onClick={this.handleOpenConfirmDialog}>DELETE MY ACCOUNT</Button>
          </div>
        )
      }
      return button
    }

    return (
      <div>
        <div className="user__settings">
          <p><b>Current User Profile</b></p>
          <p><b>Username:</b> { FloodAppUser.cognitoUsername }</p>
          <p><b>Phone:</b> { profile.phone_number.substring(2) }</p>
          <p><b>Email:</b> { email }</p>
          <span>
            {deleteAccountButton()}
          </span>
        </div>
        <Modal isOpen={this.state.openConfirmDialog} contentLabel="Confirm Changes Modal" style={reactModalStyle}>
          <Card>
            <CardTitle className="confirm-modal-title"><i className="material-icons">warning</i>
            Confirm Delete
            </CardTitle>
            <CardText className="confirm-modal-text">Are you sure you want to delete your account?
            Once deleted, your account cannot be recovered.</CardText>
            <CardActions className="confirm-modal-actions">
              <Button type="button" onClick={this.deleteAccount}>Confirm</Button>
              <Button autoFocus="true" type="button" onClick={this.handleCloseConfirmDialog}>Cancel</Button>
            </CardActions>
          </Card>
        </Modal>
      </div>
    )
  }
}

export default AccountSettingsForm
