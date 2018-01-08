import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const AboutLink = class AboutLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="button" type="button" onClick={this.props.showAbout}>
        About
      </button>
    )
  }
}

export default AboutLink
