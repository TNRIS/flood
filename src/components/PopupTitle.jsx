import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'

const floodGaugeIcon = require('../images/flood_gauge_white.png')

const PopupTitle = class PopupTitle extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};  
  }

  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
          {this.props.title == "Flood Gage Information" &&
            <Button className="subscribe-button mdl-button mdl-js-button mdl-color-text--white" onClick={this.props.showSubscribe}>
              Subscribe to this Gauge </Button>
          }
      </div>
    );
  }
}

PopupTitle.defaultProps = {
  icon: floodGaugeIcon,
  title: "Flood Gage Information"
}

export default PopupTitle
