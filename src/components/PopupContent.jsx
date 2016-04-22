import React, { Component } from 'react'

export default class PopupContent extends Component {
  render() {
    return (
      <div className="popup__content">
        { this.props.children }
      </div>
    )
  }
}
