import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'


class PopupTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    showSubscribeDialog: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
    this._handleOpenSubscribeDialog = this._handleOpenSubscribeDialog.bind(this);
  }

  _handleOpenSubscribeDialog() {
    this.setState({
      openDialog: true
    })
    console.log(this)
  }

  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
          {this.props.title == "Flood Gage Information" &&
            <Button className="subscribe-button mdl-button mdl-js-button mdl-color-text--white" onClick={ this._handleOpenSubscribeDialog }>
              Subscribe to this Gauge </Button>
          }
      </div>
    );
  }
}

export default PopupTitle
