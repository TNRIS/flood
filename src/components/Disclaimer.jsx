import React from 'react'


import Modal from 'react-modal'

const reactModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  }
}


class Disclaimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDialog: false
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
  }

  componentDidMount() {
    this.handleOpenDialog()
  }

  handleOpenDialog() {
    const ls = window.localStorage

    if (ls.hasOwnProperty('texasFloodDisclaimer') && ls.texasFloodDisclaimer === VERSION) {
      this.setState({
        openDialog: false
      })
    }
    else {
      this.setState({
        openDialog: true
      })
    }
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    })
  }

  render() {
    const updateDisclaimerAcceptance = (e) => {
      if (e.target.checked) {
        window.localStorage.setItem('texasFloodDisclaimer', VERSION)
      }
      else if (!e.target.checked) {
        window.localStorage.removeItem('texasFloodDisclaimer')
      }
    }
    let notice
    if (SITE_URL != 'map.texasflood.org') {
      notice = (
        <div>
          <h5>Notice</h5>
          <p>This application is currently in beta. All user subscriptions from previous versions of this
             application have expired. You will need to sign up for an account and resubscribe to
             gages of interest.<br></br>
             For the official version, visit:
          <a href="http://map.texasflood.org" target="_blank"> http://map.texasflood.org</a></p>
        </div>
      )
    }

    return (
      <Modal className="disclaimer-modal"
             isOpen={this.state.openDialog}
             contentLabel="Disclaimer Modal"
             style={reactModalStyle}>
        <div className="card disclaimer">
          <h2 className="disclaimer-title">Legal Review and Disclaimer</h2>
          <div className="card-section disclaimer-text">
            <p>
            The data and information presented in this viewer is the best available
            information provided to the Texas Water Development Board (TWDB) by its
            data contributors. The information may not be represented in real-time
            and should not be considered as exact conditions in your area. Neither
            the State of Texas nor the Texas Water Development Board (TWDB) assumes
            any legal liability or responsibility or makes any guarantees or warranties
            as to the accuracy, completeness, or suitability of the information for
            any purpose. By using this viewer or subscribing to a gage or gages, you agree
            to release and hold harmless TWDB and its respective representatives, agents,
            successors, assigns, employees, officers and directors, from any and all
            liability, for loss, harm, damage, injury, cost or expense whatsoever
            including without limitation, property damage, personal injury and/or death
            which may occur in connection with the application service. If you have any
            questions, please contact us at
            <a href="https://tnris.org/contact/" target="_blank"> https://tnris.org/contact/</a>
            </p>
            {notice}
          </div>
          <div className="disclaimer-button-div">
            <button className="button terms-agree-button" type="button" onClick={this.handleCloseDialog}>
            I have read and agree to these terms
            </button>
            <div className="switch tiny">
              <input className="switch-input hide-disclaimer-checkbox"
                id="noShowSwitch"
                type="checkbox"
                name="noShowSwitch"
                onChange={updateDisclaimerAcceptance} />
              <label className="switch-paddle" for="noShowSwitch">
                <span className="show-for-sr">Do not show again</span>
              </label>
              <span className="switch-label-text">Do not show again</span>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default Disclaimer
