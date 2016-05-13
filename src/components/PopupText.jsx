import React, { Component } from 'react'


export default class PopupText extends Component {
  render() {
    return (
      <div className="info__text">
        { this.props.children }
      </div>
    )
  }
}
