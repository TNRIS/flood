import React from 'react'
import ReactDOM from 'react-dom'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'

import Subscribe from './Subscribe'


class PopupTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleOpenDialog = this.openDialog.bind(this);
  }

  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
          {this.props.title == "Flood Gage Information" &&
            <Button className="subscribe-button mdl-button mdl-js-button mdl-color-text--white" onClick={console.log("click")}>
              Subscribe to this Gauge </Button>
          }
      </div>
    );
  }
}

export default PopupTitle
