import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class Disclaimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDialog: true
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
      this.handleOpenDialog()
      const dialog = ReactDOM.findDOMNode(this.refs.disclaimer)
      if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog)
      }
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
    });
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
      <div className='disclaimer__wrapper'>
        <Dialog ref='disclaimer' className='disclaimer' open={this.state.openDialog}>
          <DialogTitle>Legal Review and Disclaimer</DialogTitle>
          <DialogContent>
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
            <a href="https://tnris.org/contact/"> https://tnris.org/contact/</a>
            </p>
          </DialogContent>
          <DialogActions className="dialog-button-div">
                <Button colored className="terms-agree-button" type='button' onClick={this.handleCloseDialog}>
                I have read and agree to these terms
                </Button>
            <Checkbox
              className="hide-disclaimer-checkbox"
              label="Do not show again"
              onChange={updateDisclaimerAcceptance}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Disclaimer
