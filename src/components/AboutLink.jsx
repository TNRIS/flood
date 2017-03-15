import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'

const AboutLink = class AboutLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  return (
	    <a className="mdl-navigation__link resources__link" href="#" onClick={this.props.showAbout}>
	      About This Application
	    </a>
	  )
  }
}

export default AboutLink
