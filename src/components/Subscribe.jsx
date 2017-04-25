import React from 'react'
import ReactDOM from 'react-dom'

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class Subscribe extends React.Component {
  static propTypes = {
    email: React.PropTypes.string,
    phone: React.PropTypes.string,
    hideSubscribe: React.PropTypes.func,
    openDialog: React.PropTypes.bool,
    setUserInfo: React.PropTypes.func,
    showSnackbar: React.PropTypes.func,
    subscribeGage: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const dialog = ReactDOM.findDOMNode(this.refs.subscribeDialog)
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      email: this.props.email,
      phone: this.props.phone,
      lid: nextProps.lid,
      name: nextProps.name
    })
  }

  handleCloseDialog() {
    this.props.hideSubscribe()
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState)
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.email || this.state.phone) {
      if (this.state.phone) {
        this.props.subscribeGage(this.state.lid.toUpperCase(), "sms", this.state.phone)
      }
      if (this.state.email) {
        this.props.subscribeGage(this.state.lid.toUpperCase(), "email", this.state.email)
      }
      this.props.showSnackbar("Your subscription has been submitted")
      this.props.setUserInfo(this.state.email, this.state.phone)
      this.handleCloseDialog()
    }
    else {
      this.props.showSnackbar("Please enter an email or phone number to submit")
    }
  }

  render() {
    return (
      <div className="subscribe__wrapper">
        <Dialog ref="subscribeDialog" className="subscribeDialog" open={ this.props.openDialog }
        onCancel={ this.handleCloseDialog } >
          <DialogTitle className="subscribe-title">{ this.state.name } ({ this.state.lid })</DialogTitle>
          <form className="subscribe-form">
            <DialogContent>
              <p>Subscribe to receive text and/or email alerts when this gage reaches elevated flood stages.</p>
              <Textfield floatingLabel
                         autofocus="false"
                         onChange={ this.handleChange }
                         pattern="[0-9]*"
                         minLength={10}
                         maxLength={10}
                         error="10 digits only including US area code"
                         label="Phone..."
                         type="tel"
                         id="phone"
                         name="phone"
                         value={ this.state.phone }/>
              <Textfield floatingLabel
                         onChange={ this.handleChange }
                         label="Email..."
                         type="email"
                         id="email"
                         name="email"
                         value= { this.state.email }/>
              <sub>
                <small>{"*SMS charges may apply"}</small>
              </sub>
            </DialogContent>
            <DialogActions>
              <Button ripple className="flood-form-button" type="button" value="Submit"
                onClick={ this.handleSubmit }>Submit</Button>
              <Button ripple className="flood-form-button" type="button" value="Cancel"
                onClick={ this.handleCloseDialog }>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default Subscribe
