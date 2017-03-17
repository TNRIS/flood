import React from 'react'
import ReactDOM from 'react-dom'
import * as FloodAlerts from '../util/FloodAlerts'
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class Subscribe extends React.Component {
  static propTypes = {
    hideSubscribe: React.PropTypes.func,
    openDialog: React.PropTypes.bool
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
      FloodAlerts.subscribeGauge(this.state.lid, this.state.phone, this.state.email)
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
          <form className="subscribe-form" onSubmit={ this.handleSubmit }>
            <DialogContent>
              <p>Subscribe to receive email and/or text alerts when this gage reaches elevated flood stages.</p>
              <Textfield floatingLabel
                         onChange={ this.handleChange }
                         label="Email..."
                         type="email"
                         id="email"
                         name="email"
                         value= { this.state.email }/>
              <Textfield floatingLabel
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
              <sub>
                <small>{"Disclaimer: Flood gage alerts (or lack thereof) are in no way an indicator of safety or "
                  + "danger. Always use all available information resources during weather events."}</small>
              </sub>
            </DialogContent>
            <DialogActions>
              <Button ripple className="flood-form-button" type="submit" value="Submit">Submit</Button>
              <Button ripple className="flood-form-button" type="button" value="Cancel" onClick={ this.handleCloseDialog }>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default Subscribe
