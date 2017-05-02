import React from 'react'
import {
    Button,
    Checkbox,
    Card,
    CardTitle,
    CardText,
    CardActions
    } from 'react-mdl'

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

    return (
      <div className="disclaimer__wrapper">
        <Modal className="disclaimer-modal"
               isOpen={this.state.openDialog}
               contentLabel="Disclaimer Modal"
               style={reactModalStyle}>
          <Card className="disclaimer">
            <CardTitle expand className="disclaimer-title">Legal Review and Disclaimer</CardTitle>
            <CardText className="disclaimer-text">
              <p>
              The intent of the TexasFlood.org flood viewer is to assist
              individuals in quickly assessing the potential flood risk during a
              flooding event and to provide basic flood information before,
              during and after a flood event. The data in the flood viewer
              represents the best available information provided to the Texas
              Water Development Board (TWDB) by its data contributors. The
              information on this viewer may not be displayed in real-time and
              should not be considered an "exact" representation of conditions in
              your area. Neither the State of Texas nor the TWDB assumes any
              legal liability or responsibility or makes any guarantees or
              warranties as to the accuracy, completeness or suitability of the
              information for any particular purpose. If you have any questions,
              please contact us at
              <a href="https://tnris.org/contact/" target="_blank"> https://tnris.org/contact/</a>
              </p>
              <h5>Warning</h5>
              <p>This application is currently in beta.
              For the official version, visit:
              <a href="http://map.texasflood.org" target="_blank">http://map.texasflood.org</a></p>
            </CardText>
            <CardActions className="disclaimer-button-div">
              <Button colored className="terms-agree-button" type="button" onClick={this.handleCloseDialog}>
              I have read and agree to these terms
              </Button>
              <Checkbox
                className="hide-disclaimer-checkbox"
                label="Do not show again"
                onChange={updateDisclaimerAcceptance}
              />
            </CardActions>
          </Card>
        </Modal>
      </div>
    )
  }
}

export default Disclaimer
