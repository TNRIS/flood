import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

/** Form for entering a new password and updating current user profile */
class NewPasswordForm extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: '',
      password: '',
      confirmPassword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPassword = this.handleNewPassword.bind(this)
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

  /**
   * Submits the form information with the username to change the account password
   * @param {object} event - event fired when the SUBMIT button is clicked
   */
  handleNewPassword(event) {
    event.preventDefault()
    if (this.state.password == '') {
      this.props.showSnackbar("Please enter a password")
      return
    }
    if (this.state.password != this.state.confirmPassword) {
      this.props.showSnackbar("Passwords do not match")
      this.setState({
        password: '',
        confirmPassword: ''
      })
      return
    }
    this.props.newPassword(this.state.verificationCode, this.state.password)
  }

  render() {

    return (
        <form onSubmit={ this.handleNewPassword } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>A verification code has been sent via text message to the phone number associated with this account.</p>
            <p>Please enter your 6 digit verification code and new password below.</p>
            <Textfield floatingLabel
                       pattern="[0-9]*"
                       minLength={6}
                       maxLength={6}
                       error="6 digits required"
                       label="Verification Code"
                       type="tel"
                       id="verificationCode"
                       name="verificationCode"
                       onChange={this.handleChange}
                       value={this.state.verificationCode}/>
            <Textfield floatingLabel
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
                       minLength={8}
                       error="Minimum 8 characters. Requires uppercase, lowercase, a number, and a special character"
                       label="New Password"
                       type="password"
                       id="password"
                       name="password"
                       onChange={this.handleChange}
                       value={this.state.password}/>
            <Textfield floatingLabel
                       minLength={8}
                       pattern={this.state.password}
                       label="Confirm New Password"
                       type="password"
                       id="confirmPassword"
                       name="confirmPassword"
                       onChange={this.handleChange}
                       value={this.state.confirmPassword}/>
            <Button ripple
              className="flood-form-button"
              type="submit"
              value="Submit"
              style={{marginRight: "10px", marginBottom: "16px"}}>SUBMIT</Button>
        </form>
    )
  }
}

export default NewPasswordForm
