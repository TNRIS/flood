import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-mdl'

const floodGaugeIcon = require('../images/flood_gauge_white.png')

const PopupTitle = class PopupTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
          {this.props.title == "Flood Gage" &&
            <Button className="subscribe-button mdl-color-text--white" onClick={this.props.showSubscribe}>Subscribe</Button>
          }
      </div>
    );
  }
}

PopupTitle.defaultProps = {
  icon: floodGaugeIcon,
  title: "Flood Gage"
}

export default PopupTitle
