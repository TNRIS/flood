import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

import SubscriptionListContainer from '../containers/SubscriptionListContainer'

/** Form for entering user info and updating current subscriptions */
class SubscriptionForm extends Component {
  static propTypes = {
    allSubscriptions: PropTypes.array,
    clearSubscriptionList: PropTypes.func,
    currentSubscriptions: PropTypes.object,
    email: PropTypes.string,
    phone: PropTypes.string,
    getUserSubscriptions: PropTypes.func,
    isFetching: PropTypes.bool,
    isUpdating: PropTypes.bool,
    setUserInfo: PropTypes.func,
    displayForm: PropTypes.string,
    swapDisplayForm: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      loginPassword: '',
      phone: '',
      email: '',
      verificationCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleVerification = this.handleVerification.bind(this)
  }

  // componentWillMount() {
  //   this.setState({,
  //     // email: this.props.email,
  //     // phone: this.props.phone,
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        error: nextProps.error,
        isFetching: nextProps.isFetching,
        nextToken: nextProps.nextToken
      })
    }
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
   * Sets the user info in the store and searches for the user's subscriptions
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleSearch(event) {
    event.preventDefault()
    this.props.userLogin(this.state.username, this.state.password)
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

  /**
   * Creates an account for the user in the user pool
   * @param {object} event - event fired when the SIGN UP button is clicked
   */
  handleVerification(event) {
    event.preventDefault()
    this.props.userVerify(this.state.username, this.state.verificationCode)
  }

  render() {
    let subscriptionManagerContent
    let searchButtonDisabled
    let formSwapper

    // searchButtonDisabled = (this.state.email.length === 0 && this.state.phone.length === 0)

    // Checks to see if there are any subscriptions to display in the store or if the form is still fetching
    if (this.props.allSubscriptions.length > 0 && !this.props.isFetching && !this.props.isUpdating) {
      subscriptionManagerContent = (<SubscriptionListContainer/>)
    }
    else if (this.props.isFetching || this.props.isUpdating) {
      subscriptionManagerContent = (
        <Spinner style={{display: 'block', margin: 'auto',  marginBottom: "40px", marginTop: "40px"}}/>
      )
    }
    else if (this.props.displayForm == "login") {
      subscriptionManagerContent = (
        <form onSubmit={ this.handleSearch } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Click on a flood gage and subscribe to receive alerts.</p>
            <p>Enter your phone number and password to manage your current subscriptions.</p>
            <Textfield floatingLabel
                       label="Username"
                       type="username"
                       id="username"
                       name="username"
                       onChange={this.handleChange}
                       value={this.state.username}/>
            <p style={{margin: "0"}}>or</p>
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
                       label="Password"
                       type="password"
                       id="password"
                       name="password"
                       onChange={this.handleChange}
                       value={this.state.password}/>
            <Button ripple
              className="flood-form-button"
              type="submit"
              value="Submit"
              style={{marginRight: "10px"}}>LOGIN</Button>
        </form>
      )
      formSwapper = (
        <p className="form__swapper">
          <span>Don&#39;t have an account? </span>
          <a href="#" onClick={ () => this.props.swapDisplayForm("signUp") }>Sign Up</a>
        </p>
      )
    }
    else if (this.props.displayForm == "signUp") {
      subscriptionManagerContent = (
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
      formSwapper = (
        <p className="form__swapper">
          <span>Already have an account? </span>
          <a href="#" onClick={ () => this.props.swapDisplayForm("login") }>Login</a>
        </p>
      )
    }
    else if (this.props.displayForm == "verify") {
      subscriptionManagerContent = (
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
      formSwapper = (
        <p className="form__swapper"></p>
      )
    }

    return (
        <div ref="subscriptionManager"
        style={{paddingTop: '20px', paddingBottom: '20px', paddingLeft: '0', paddingRight: '0', display: 'block'}}>
          {subscriptionManagerContent}
          {formSwapper}
        </div>
    )
  }
}

export default SubscriptionForm
