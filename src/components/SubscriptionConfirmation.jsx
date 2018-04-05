import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-modal'
import AlertTypeIndicatorContainer from '../containers/AlertTypeIndicatorContainer'

const reactModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  }
}


class SubscriptionConfirmation extends Component {
  static propTypes = {
    showConfirmation: PropTypes.bool,
    hideSubscriptionConfirmation: PropTypes.func,
    showSnackbar: PropTypes.func,
    subscribeGage: PropTypes.func,
    popupData: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      lid: "",
      name: ""
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
    this.setState({
      lid: this.props.popupData.data.lid.toUpperCase(),
      name: this.props.popupData.data.name
    })
  }

  handleCloseModal() {
    this.props.hideSubscriptionConfirmation()
  }

  handleConfirmation(event) {
    event.preventDefault()
    this.props.subscribeGage(this.props.popupData.data.lid.toUpperCase(), true)
    this.handleCloseModal()
  }

  render() {
    return (
      <Modal isOpen={this.props.showConfirmation}
             contentLabel="Confirm Changes Modal"
             style={reactModalStyle}
             className="subscription-confirm-modal">
        <div className="card">
          <div className="card-divider subscription-confirm-modal-title">
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
            <span className="title-span">Confirm Subscription</span>
            <AlertTypeIndicatorContainer/>
          </div>
          <div className="card-section subscription-confirm-modal-text">
            <p>Are you sure you want to subscribe to receive alerts for the
            <b> { this.state.name } ({ this.state.lid })</b> flood gage?</p>
          </div>
          <div className="card-section subscription-confirm-modal-actions">
            <button className="button" type="button" onClick={this.handleConfirmation}>Confirm</button>
            <button className="button" autoFocus="true" type="button" onClick={this.handleCloseModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SubscriptionConfirmation
