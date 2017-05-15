import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

/** Form for entering user info and updating current subscriptions */
class VerifyForm extends Component {
  static propTypes = {
    username: PropTypes.string,
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
   * Creates an account for the user in the user pool
   * @param {object} event - event fired when the SIGN UP button is clicked
   */
  handleVerification(event) {
    event.preventDefault()
    this.props.userVerify(this.props.username, this.state.verificationCode)
  }

  render() {
    
    return (
        <form onSubmit={ this.handleVerification } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>You have been sent a verification code via text message.</p>
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
