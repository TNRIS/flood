import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Button, Icon } from 'react-mdl'

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
        <Button className="popup__close mdl-color-text--white" onClick={this.props.clearPopup}>
          <Icon
              name="clear"
              className="material-icons"
          />
        </Button>
          {this.props.title == "Flood Gage" &&
            <Button className="subscribe-button mdl-color-text--white" onClick={this.props.showSubscribe}>Subscribe</Button>
          }
      </div>
    );
  }
}

export default PopupTitle
