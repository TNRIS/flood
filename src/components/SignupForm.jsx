import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

/** Form for entering user info and updating current subscriptions */
class SignupForm extends Component {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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
   * Creates an account for the user in the user pool and sends a verification code.
   * @param {object} event - event fired when the SIGN UP button is clicked
   */
  handleSignUp(event) {
    event.preventDefault()
    if (this.state.username == '') {
      this.props.showSnackbar("Please enter a username")
      return
    }
    if (this.state.phone == '') {
      this.props.showSnackbar("Please enter your phone number")
      return
    }
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
    this.props.userSignUp(this.state.username, this.state.password, this.state.phone, this.state.email)
  }

  render() {

    return (
        <form onSubmit={ this.handleSignUp } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Sign up for an account to begin subscribing to flood gages.</p>
            <p>Receive text message alerts when gages enter flood stages.</p>
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
              style={{marginRight: "10px"}}>SIGN UP</Button>
        </form>
    )
  }
}

export default SignupForm
