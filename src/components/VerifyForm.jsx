import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

/** Form for verifying a newly created account */
class VerifyForm extends Component {
  static propTypes = {
    username: PropTypes.string,
    phone: PropTypes.string,
    userVerify: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: ''
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
  }

  /**
   * Verifies the account in the user pool so the user is now authorized
   * @param {object} event - event fired when the SIGN UP button is clicked
   */
  handleVerification(event) {
    event.preventDefault()
    this.props.userVerify(this.props.username, this.state.verificationCode)
  }

  render() {
    return (
        <form onSubmit={ this.handleVerification } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>A verification code has been sent to {this.props.phone} via text message.</p>
            <p>Please enter your 6 digit verification code below to confirm your account.</p>
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
            <Button ripple
              className="flood-form-button"
              type="submit"
              value="Submit"
              style={{marginRight: "10px", marginBottom: "16px"}}>SUBMIT</Button>
        </form>
    )
  }
}

export default VerifyForm
