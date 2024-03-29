import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Form for verifying a newly created account */
class VerifyForm extends Component {
  static propTypes = {
    phone: PropTypes.string,
    userVerify: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: '',
      labelVC: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleVerification = this.handleVerification.bind(this)
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
  }

  /**
   * Verifies the account in the user pool so the user is now authorized
   * @param {object} event - event fired when the SIGN UP button is clicked
   */
  handleVerification(event) {
    event.preventDefault()
    this.props.userVerify(this.state.verificationCode)
  }

  render() {
    return (
        <form onSubmit={ this.handleVerification } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>A verification code has been sent to your phone or your email.</p>
            <p>Please enter the 6 digit verification code below to confirm your account.</p>
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
            <div className="login-button-wrapper">
              <button
                className="button flood-form-button"
                type="submit"
                value="Submit">SUBMIT</button>
            </div>
        </form>
    )
  }
}

export default VerifyForm
