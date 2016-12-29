import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as FloodAlerts from '../util/FloodAlerts'
import {
    Textfield,  Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      const dialog = ReactDOM.findDOMNode(this.refs.subscribeDialog)
      if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog)
      }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      lid: nextProps.lid,
      name: nextProps.name
    })
  }

  handleCloseDialog() {
    this.setState({
      phone: null,
      email: null
    });
    this.props.hideSubscribe();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    if (this.state.email||this.state.phone) {
      FloodAlerts.subscribeGauge(this.state.lid, this.state.phone, this.state.email)
      alert("Your subscription has been submitted!")
      this.handleCloseDialog()
    }
    
  }
  
  render() {
    return (
      <div className='subscribe__wrapper'>
        <Dialog ref="subscribeDialog" className="subscribeDialog" open={ this.props.openDialog } onCancel={ this.handleCloseDialog } >
          <DialogTitle className="subscribe-title">{this.state.name} ({this.state.lid})</DialogTitle>
          <form className="subscribe-form" onSubmit={this.handleSubmit}>
            <DialogContent>
              <p>Subscribe to recieve email and or text alerts when this gauge reaches a potentially dangerous flood stage.</p>
              <Textfield floatingLabel
                         onChange={ this.handleChange }
                         label="Email..."
                         type="email"
                         id="email"
                         name="email"
                         value= {this.state.email }
              />
              <Textfield
                         floatingLabel
                         onChange={ this.handleChange }
                         pattern="[0-9]*"
                         minLength={9}
                         maxLength={9}
                         error="9igits only including US area code"
                         label="Phone..."
                         type="tel" 
                         id="phone"
                         name="phone"
                         value={ this.state.phone }
              />
            </DialogContent>
            <DialogActions>
              <Button raised ripple type="submit" value="Submit">Submit</Button>
              <Button raised ripple type="button" value="Cancel" onClick={ this.handleCloseDialog }>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default Subscribe
