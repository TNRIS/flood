import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield, Icon } from 'react-mdl'

import SubscriptionListContainer from '../containers/SubscriptionListContainer'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import VerifyForm from './VerifyForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import NewPasswordForm from './NewPasswordForm'
import AccountSettingsFormContainer from '../containers/AccountSettingsFormContainer'

import FloodAppUser from '../util/User'

/** Form for entering user info and updating current subscriptions */
class SubscriptionForm extends Component {
  static propTypes = {
    allSubscriptions: PropTypes.array,
    clearSubscriptionList: PropTypes.func,
    currentSubscriptions: PropTypes.object,
    email: PropTypes.string,
    phone: PropTypes.string,
    username: PropTypes.string,
    getUserSubscriptions: PropTypes.func,
    isFetching: PropTypes.bool,
    isUpdating: PropTypes.bool,
    setUserInfo: PropTypes.func,
    displayForm: PropTypes.string,
    swapDisplayForm: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        error: nextProps.error,
        isFetching: nextProps.isFetching,
        nextToken: nextProps.nextToken
      })
    }
  }

  render() {
    let subscriptionManagerContent
    let formSwapper
    const userTools = (
      <div className="settings-sign-out-button-wrapper">
        <Button
        onClick={ () => this.props.swapDisplayForm("userSettings") }>Settings</Button>
        <Button
        onClick={ this.props.userSignOut }>Sign Out</Button>
      </div>
    )

    let formByLength
    if (this.props.allSubscriptions.length === 0) {
      formByLength = "noSubscriptions"
    }
    else {
      formByLength = "SubscriptionList"
    }

    const userToolsSettings = (
      <div className="subscriptions-sign-out-button-wrapper">
        <Button
        onClick={ () => this.props.swapDisplayForm(formByLength) }>Subscriptions</Button>
        <Button
        onClick={ this.props.userSignOut }>Sign Out</Button>
      </div>
    )

    // Checks to see if there are any subscriptions to display in the store or if the form is still fetching
    if (this.props.isFetching || this.props.isUpdating) {
      subscriptionManagerContent = (
        <Spinner style={{display: 'block', margin: 'auto',  marginBottom: "40px", marginTop: "40px"}}/>
      )
    }
    else if (this.props.displayForm === "SubscriptionList") {
      subscriptionManagerContent = (<SubscriptionListContainer/>)
      formSwapper = (userTools)
    }
    else if (this.props.displayForm == "login") {
      subscriptionManagerContent = (
        <LoginForm userLogin={this.props.userLogin}/>
      )
      formSwapper = (
        <div>
          <p className="form__swapper">
            <span>Don&#39;t have an account? </span>
            <a href="#" onClick={ () => this.props.swapDisplayForm("signUp") }>Sign Up</a>
          </p>
          <p className="form__swapper">
            <a href="#" onClick={ () => this.props.swapDisplayForm("forgotPassword") }>Forgot or Change Password</a>
          </p>
        </div>
      )
    }
    else if (this.props.displayForm == "signUp") {
      subscriptionManagerContent = (
        <SignupForm userSignUp={this.props.userSignUp} showSnackbar={this.props.showSnackbar}/>
      )
      formSwapper = (
        <p className="form__swapper">
          <span>Already have an account? </span>
          <a href="#" onClick={ () => this.props.swapDisplayForm("login") }>Sign In</a>
        </p>
      )
    }
    else if (this.props.displayForm == "verify") {
      subscriptionManagerContent = (
        <VerifyForm phone={FloodAppUser.phone} userVerify={this.props.userVerify}/>
      )
      formSwapper = (
        <p className="form__swapper">
          <span>Having trouble? </span>
          <a href="#" onClick={ this.props.resendVerificationCode }>Resend Verification Code</a>
        </p>
      )
    }
    else if (this.props.displayForm == "forgotPassword") {
      subscriptionManagerContent = (
        <ForgotPasswordForm forgotPassword={this.props.forgotPassword}/>
      )
      formSwapper = (
        <p className="form__back">
          <Icon
              name="arrow_back"
              onClick={ () => this.props.swapDisplayForm("login") }
          />
        </p>
      )
    }
    else if (this.props.displayForm == "newPassword") {
      subscriptionManagerContent = (
        <NewPasswordForm username={FloodAppUser.username} newPassword={this.props.newPassword} showSnackbar={this.props.showSnackbar}/>
      )
      formSwapper = (
        <p className="form__swapper">
        </p>
      )
    }
    else if (this.props.displayForm === "noSubscriptions" && this.props.allSubscriptions.length === 0) {
      subscriptionManagerContent = (
        <p style={{marginRight: "10px", marginLeft: "10px"}}>No alert subscriptions found. Click on a gage to sign up for alerts.</p>
      )
      formSwapper = (userTools)
    }
    else if (this.props.displayForm === "userSettings") {
      subscriptionManagerContent = (
        <AccountSettingsFormContainer/>
      )
      formSwapper = (userToolsSettings)
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
