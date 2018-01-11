import React, { Component } from 'react'


/** Form for entering a new password and updating current user profile */
class NewPasswordForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: '',
      password: '',
      confirmPassword: '',
      labelVC: '',
      labelPWD: '',
      labelCNP: ''
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

    if (name === 'verificationCode' && value != '') {
      this.setState({labelVC: 'Verification Code'})
    }
    else if (name === 'verificationCode' && value === '') {
      this.setState({labelVC: ''})
    }
    if (name === 'password' && value != '') {
      this.setState({labelPWD: 'New Password'})
    }
    else if (name === 'password' && value === '') {
      this.setState({labelPWD: ''})
    }
    if (name === 'confirmPassword' && value != '') {
      this.setState({labelCNP: 'Confirm New Password'})
    }
    else if (name === 'confirmPassword' && value === '') {
      this.setState({labelCNP: ''})
    }
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
            <label className="form-chunk">{this.state.labelVC}
              <input
                       pattern="[0-9]*"
                       minLength={6}
                       maxLength={6}
                       error="6 digits required"
                       type="tel"
                       id="verificationCode"
                       name="verificationCode"
                       placeholder="Verification Code"
                       onChange={this.handleChange}
                       value={this.state.verificationCode}/>
            </label>
            <label className="form-chunk">{this.state.labelPWD}
              <input
                       pattern=".{6,}"
                       minLength={6}
                       error="Minimum 6 characters."
                       type="password"
                       id="password"
                       name="password"
                       placeholder="New Password"
                       onChange={this.handleChange}
                       value={this.state.password}/>
            </label>
            <label className="form-chunk">{this.state.labelCNP}
              <input
                       minLength={6}
                       pattern={this.state.password}
                       type="password"
                       id="confirmPassword"
                       name="confirmPassword"
                       placeholder="Confirm New Password"
                       onChange={this.handleChange}
                       value={this.state.confirmPassword}/>
            </label>
            <button
              className="button flood-form-button"
              type="submit"
              value="Submit">SUBMIT</button>
        </form>
    )
  }
}

export default NewPasswordForm
