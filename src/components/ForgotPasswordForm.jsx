import React, { Component } from 'react'
import PropTypes from 'prop-types'


/** Form for resetting a forgotten password */
class ForgotPasswordForm extends Component {
  static propTypes = {
    userLogin: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phone: '',
      usernameDisabled: false,
      phoneDisabled: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  /**
   * Watches for changes on the html inputs and toggles the username/phone number inputs
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState, function () {
      if (this.state.username != '' && this.state.phone == '') {
        this.setState({
          usernameDisabled: false,
          phoneDisabled: true
        })
      }
      else if (this.state.username == '' && this.state.phone != '') {
        this.setState({
          usernameDisabled: true,
          phoneDisabled: false
        })
      }
      else {
        this.setState({
          usernameDisabled: false,
          phoneDisabled: false
        })
      }
    })
  }

  moveCaretAtEnd(e) {
    const value = e.target.value
    e.target.value = ''
    e.target.value = value
  }

  /**
   * Sends a verification code to the submitted username for resetting the account password
   * @param {object} event - event fired when the SUBMIT button is clicked
   */
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.username != '' && this.state.phone == '') {
      this.props.forgotPassword(this.state.username)
    }
    else if (this.state.username == '' && this.state.phone != '') {
      const formattedPhone = `+1${this.state.phone}`
      this.props.forgotPassword(formattedPhone)
    }
  }


  render() {
    let inputs

    if (this.state.username != '' && this.state.phone == '') {
      inputs = (<label>Username<input
                       autoFocus
                       onFocus={this.moveCaretAtEnd}
                       type="text"
                       id="username"
                       name="username"
                       onChange={this.handleChange}
                       value={this.state.username}
                       disabled={this.state.usernameDisabled}/></label>)
    }
    else if (this.state.username == '' && this.state.phone != '') {
      inputs = (<label>Phone Number<input
                       autoFocus
                       onFocus={this.moveCaretAtEnd}
                       pattern="[0-9]*"
                       minLength={10}
                       maxLength={10}
                       error="10 digits only including US area code"
                       type="tel"
                       id="phone"
                       name="phone"
                       onChange={this.handleChange}
                       value={this.state.phone}
                       disabled={this.state.phoneDisabled}/></label>)
    }
    else {
      inputs = (<div>
            <label>Username
              <input
               type="text"
               id="username"
               name="username"
               onChange={this.handleChange}
               value={this.state.username}
               disabled={this.state.usernameDisabled}/>
            </label>
            <p style={{margin: "0"}}>or</p>
            <label>Phone Number
              <input
               pattern="[0-9]*"
               minLength={10}
               maxLength={10}
               error="10 digits only including US area code"
               type="tel"
               id="phone"
               name="phone"
               onChange={this.handleChange}
               value={this.state.phone}
               disabled={this.state.phoneDisabled}/></label></div>)
    }

    return (
        <form onSubmit={ this.handleSubmit } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Enter your username or phone number to change your password.</p>
            {inputs}
            <button
              className="button flood-form-button"
              type="submit"
              value="Submit"
              style={{marginRight: "10px"}}>SUBMIT</button>
        </form>
    )
  }
}

export default ForgotPasswordForm
