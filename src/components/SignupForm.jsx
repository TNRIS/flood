import React, { Component } from 'react'
import PropTypes from 'prop-types'


/** Form for creating a new user account and beginning the verification process */
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
      confirmPassword: '',
      labelUser: '',
      labelPhone: '',
      labelEmail: '',
      labelPWD: '',
      labelCPW: ''
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

    if (name === 'username' && value != '') {
      this.setState({labelUser: 'Username'})
    }
    else if (name === 'username' && value === '') {
      this.setState({labelPWD: ''})
    }
    if (name === 'phone' && value != '') {
      this.setState({labelPhone: 'Mobile Phone Number'})
    }
    else if (name === 'phone' && value === '') {
      this.setState({labelPhone: ''})
    }
    if (name === 'email' && value != '') {
      this.setState({labelEmail: 'Email'})
    }
    else if (name === 'email' && value === '') {
      this.setState({labelEmail: ''})
    }
    if (name === 'password' && value != '') {
      this.setState({labelPWD: 'Password'})
    }
    else if (name === 'password' && value === '') {
      this.setState({labelPWD: ''})
    }
    if (name === 'confirmPassword' && value != '') {
      this.setState({labelCPW: 'Confirm Password'})
    }
    else if (name === 'confimPassword' && value === '') {
      this.setState({labelCPW: ''})
    }
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
    if (confirm(`Is ${this.state.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")} your correct mobile phone number?`)) {
      this.props.userSignUp(this.state.username, this.state.password, this.state.phone, this.state.email)
    } else {
      return
    }
  }

  render() {

    return (
        <form onSubmit={ this.handleSignUp } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Sign up for an account to subscribe to flood gages and begin receiving text message alerts when they
              enter elevated flood stages.</p>
            <label className="form-chunk">{this.state.labelUser}
              <input
                       pattern="[^0-9\s]\S*"
                       title="Username must not start with a number or contain spaces"
                       type="username"
                       id="username"
                       name="username"
                       placeholder="Username"
                       onChange={this.handleChange}
                       value={this.state.username}/>
            </label>
            <label className="form-chunk">{this.state.labelPhone}
              <input
                       pattern="[0-9]*"
                       minLength={10}
                       maxLength={10}
                       title="10 digits only including US area code"
                       type="tel"
                       id="phone"
                       name="phone"
                       placeholder="Mobile Phone Number"
                       onChange={this.handleChange}
                       value={this.state.phone}/>
            </label>
            <label className="form-chunk">{this.state.labelEmail}
              <input
                       type="email"
                       id="email"
                       name="email"
                       placeholder="Email"
                       onChange={this.handleChange}
                       value={this.state.email}/>
            </label>
            <label className="form-chunk">{this.state.labelPWD}
              <input
                       pattern=".{6,}"
                       minLength={6}
                       title="Minimum 6 characters."
                       type="password"
                       id="password"
                       name="password"
                       placeholder="Password"
                       onChange={this.handleChange}
                       value={this.state.password}/>
            </label>
            <label className="form-chunk">{this.state.labelCPW}
              <input
                       minLength={6}
                       pattern={this.state.password}
                       title="Passwords do not match."
                       type="password"
                       id="confirmPassword"
                       name="confirmPassword"
                       placeholder="Confirm Password"
                       onChange={this.handleChange}
                       value={this.state.confirmPassword}/>
            </label>
            <div className="login-button-wrapper">
              <button
                className="button flood-form-button"
                type="submit"
                value="Submit">SIGN UP</button>
            </div>
        </form>
    )
  }
}

export default SignupForm
