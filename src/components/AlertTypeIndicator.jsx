import React from 'react'
import PropTypes from 'prop-types'

import FloodAppUser from '../util/User'

class AlertTypeIndicator extends React.Component {
  static propTypes = {
    showSnackbar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.current = FloodAppUser.userData["custom:currentAlerts"] === "T" ? "on" : "off"
    this.predictive = FloodAppUser.userData["custom:predictiveAlerts"] === "T" ? "on" : "off"
  }

  fireToaster () {
    this.props.showSnackbar("Edit your account Settings to change the types of alerts you receive.", 4000)
  }

  render() {
    const currentClass = "badge turned-" + this.current
    const predictiveClass = "badge turned-" + this.predictive

    const currentTitle = "Current alerts are turned " + this.current
    const predictiveTitle = "Predictive alerts are turned " + this.predictive
    return (
      <div className="alert-type-indicator">
        <span className={currentClass} title={currentTitle} onClick={() => this.fireToaster()}>C</span>
        <span className={predictiveClass} title={predictiveTitle} onClick={() => this.fireToaster()}>P</span>
      </div>
    )
  }
}

export default AlertTypeIndicator
