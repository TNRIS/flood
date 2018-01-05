import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const AboutLink = class AboutLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="mdl-navigation__link resources__link" href="#" onClick={this.props.showAbout}>
        About
      </a>
    )
  }
}

export default AboutLink
