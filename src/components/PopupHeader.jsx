import React, { Component } from 'react'


export default class PopupHeader extends Component {
  render() {
    return (
      <div className="info__name">
        { this.props.children }
      </div>
    )
  }
}
