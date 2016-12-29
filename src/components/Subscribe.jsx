import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import PopupTitle from './PopupTitle'
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
    this.subscribeAlerts = this.subscribeAlerts.bind(this);
  }

  subscribeAlerts(protocol, endpoint) {
    const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);

    var sns = new AWS.SNS();

    var params = {
      Protocol: protocol,
      TopicArn: "arn:aws:sns:us-east-1:746466009731:flood-test",
      Endpoint: endpoint
    };

    sns.subscribe(params, function (err_subscribe, data) {
      if (err_subscribe) {
        console.log("error when subscribe", err_subscribe);
        return;
        alert("There was an error with your " + protocol + " submission, please try again.");
      }
      else {
        console.log("subscribe data", data);
        
        if (protocol == "sms") {
          sns.publish({PhoneNumber: endpoint, Message: 'You have subscribed to a flood guage. Reply "STOP" at any time to stop recieving messages from this guage.'}, function(err_publish, data) {
            if (err_publish) {
                console.log('Error sending a message', err_publish);
            }
            else {
              console.log('Sent message:', data.MessageId);
              console.log(data);
            }
          });
        }
      }
    });
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
      lid: nextProps.lid
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
    var nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    // if (this.state.email) {
    //   this.subscribeAlerts('email', this.state.email);
    // }
    // if (this.state.phone) {
    //   this.subscribeAlerts('sms', '+1' + this.state.phone);
    // }
    this.handleCloseDialog();

    if (this.state.email||this.state.phone) {
      alert("Your subscription has been submitted!");
    }
  }
  
  render() {
    return (
      <div className='subscribe__wrapper'>
        <Dialog ref="subscribeDialog" className="subscribeDialog" open={ this.props.openDialog } onCancel={ this.handleCloseDialog } >
          <DialogTitle className="subscribe-title">{this.state.lid} , {this.props.name}!</DialogTitle>
          <form className="subscribe-form" onSubmit={this.handleSubmit}>
            <DialogContent>
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
                         error="Digits only"
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
