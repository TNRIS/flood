import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import * as dialogPolyfill from 'dialog-polyfill'


class Subscribe extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    phone: PropTypes.string,
    hideSubscribe: PropTypes.func,
    openDialog: PropTypes.bool,
    setUserInfo: PropTypes.func,
    showSnackbar: PropTypes.func,
    subscribeGage: PropTypes.func
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
    this.props.subscribeGage(this.state.lid.toUpperCase())
    this.props.showSnackbar("Your subscription has been submitted")
    this.handleCloseDialog()
  }

  render() {
    return (
      <div className="subscribe__wrapper">
        <Modal className="subscribeDialog"
               isOpen={ this.props.openDialog }
               contentLabel="Subscribe Modal"
               style={reactModalStyle}
               ref="subscribeDialog">
          <div className="card subscribe-form">
            <div classname="card-divider">
              <p>Are you sure you want to subscribe to receive alerts for the <b>{ this.state.name } ({ this.state.lid })</b> flood gage?</p>
            </div>
            <div className="card-section">
              <button className="button flood-form-button" type="button" value="Submit"
                onClick={ this.handleSubmit }>Submit</button>
              <button className="button flood-form-button" type="button" value="Cancel"
                onClick={ this.handleCloseDialog }>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Subscribe
