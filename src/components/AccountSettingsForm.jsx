import React, { Component, PropTypes } from 'react'
import { Button, Card, CardTitle, CardText, CardActions, Spinner, Textfield } from 'react-mdl'

import Modal from 'react-modal'


const reactModalStyle = {
  overlay: {
    backgroundColor   : 'rgba(0, 0, 0, 0.50)'
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

/** Form for creating a new user account and beginning the verification process */
class AccountSettingsForm extends Component {
  static propTypes = {
    userSignUp: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.handleOpenConfirmDialog = this.handleOpenConfirmDialog.bind(this)
    this.handleCloseConfirmDialog = this.handleCloseConfirmDialog.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  /**
   * Watches for changes on the html inputs
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState)
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
    console.log("")
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSignUp } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Update your account settings below.</p>
            <Textfield floatingLabel
                       label="Username"
                       type="username"
                       id="username"
                       name="username"
                       onChange={this.handleChange}
                       value={this.state.username}/>
            <Textfield floatingLabel
                       pattern="[0-9]*"
                       minLength={10}
                       maxLength={10}
                       error="10 digits only including US area code"
                       label="Phone Number"
                       type="tel"
                       id="phone"
                       name="phone"
                       onChange={this.handleChange}
                       value={this.state.phone}/>
            <Textfield floatingLabel
                       label="Email"
                       type="email"
                       id="email"
                       name="email"
                       onChange={this.handleChange}
                       value={this.state.email}/>
            <Textfield floatingLabel
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
                       minLength={8}
                       error="Minimum 8 characters. Requires uppercase, lowercase, a number, and a special character"
                       label="Password"
                       type="password"
                       id="password"
                       name="password"
                       onChange={this.handleChange}
                       value={this.state.password}/>
            <Textfield floatingLabel
                       minLength={8}
                       pattern={this.state.password}
                       label="Confirm Password"
                       type="password"
                       id="confirmPassword"
                       name="confirmPassword"
                       onChange={this.handleChange}
                       value={this.state.confirmPassword}/>
            <Button ripple
              className="flood-form-button"
              type="submit"
              value="Submit"
              style={{marginRight: "10px"}}>UPDATE</Button>
        </form>
        <span style={{padding: "10px"}}>
          <Button raised
          style={{background: "#c0392b", color: "white", width: "280px"}}
          onClick={this.handleOpenConfirmDialog}>DELETE MY ACCOUNT</Button>
        </span>
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
