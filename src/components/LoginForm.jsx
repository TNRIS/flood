import React, { Component, PropTypes } from 'react'
import { Button, Textfield } from 'react-mdl'


/** Form for entering user info and updating current subscriptions */
class LoginForm extends Component {
  static propTypes = {
    userLogin: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phone: '',
      password: '',
      usernameDisabled: false,
      phoneDisabled: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
   * Sets the user info in the store and searches for the user's subscriptions
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleSearch(event) {
    event.preventDefault()
    if (this.state.username != '' && this.state.phone == '') {
      this.props.userLogin(this.state.username, this.state.password)
    }
    else if (this.state.username == '' && this.state.phone != '') {
      const formattedPhone = `+1${this.state.phone}`
      this.props.userLogin(formattedPhone, this.state.password)
    }
  }


  render() {
    let inputs

    if (this.state.username != '' && this.state.phone == '') {
      inputs = (<Textfield floatingLabel
                       autoFocus
                       onFocus={this.moveCaretAtEnd}
                       label="Username"
                       type="username"
                       id="username"
                       name="username"
                       onChange={this.handleChange}
                       value={this.state.username}
                       disabled={this.state.usernameDisabled}/>)
    }
    else if (this.state.username == '' && this.state.phone != '') {
      inputs = (<Textfield floatingLabel
                       autoFocus
                       onFocus={this.moveCaretAtEnd}
                       pattern="[0-9]*"
                       minLength={10}
                       maxLength={10}
                       error="10 digits only including US area code"
                       label="Phone Number"
                       type="tel"
                       id="phone"
                       name="phone"
                       onChange={this.handleChange}
                       value={this.state.phone}
                       disabled={this.state.phoneDisabled}/>)
    }
    else {
      inputs = (<div>
            <Textfield floatingLabel
                       label="Username"
                       type="username"
                       id="username"
                       name="username"
                       onChange={this.handleChange}
                       value={this.state.username}
                       disabled={this.state.usernameDisabled}/>
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
                       value={this.state.phone}
                       disabled={this.state.phoneDisabled}/></div>)
    }

    return (
        <form className="login-form" onSubmit={ this.handleSearch }>
            <p>Enter your username or phone number with your password to manage your current subscriptions.</p>
            {inputs}
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
              style={{marginRight: "10px"}}>sign in</Button>
        </form>
    )
  }
}

export default LoginForm
