import React from 'react'
import ReactDOM from 'react-dom'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class PopupTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openDialog: false
                  };
    this.showSubscribeDialog = this.showSubscribeDialog.bind(this);
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
      TopicArn: keys.SNS_TOPIC_ARN,
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
      this.setState({
      openDialog: false
    });
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  showSubscribeDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    });
    console.log(this.state);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    var nextState = {};
    nextState[name] = value;
    this.setState(nextState);
    console.log(nextState);
  }

  handleSubmit(event) {
    if (this.state.email) {
      this.subscribeAlerts('email', this.state.email);
    }
    if (this.state.phone) {
      this.subscribeAlerts('sms', '+1' + this.state.phone);
    }
    console.log(this.state);
    if (this.state.email||this.state.phone) {
      alert("Your subscription has been submitted!");
    }

    this.handleCloseDialog();
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="popup__title">
        <img src={ this.props.icon } className="popup__icon" />
        <span className="popup__title-text">
          { this.props.title }
        </span>
        <span className="popup__button">
          {this.props.title == "Flood Gage Information" &&
            <button className="mdl-button mdl-js-button mdl-color-text--white" id="subscribe" onClick={this.showSubscribeDialog}>
              { this.props.button }
            </button>
          }
        </span>
          <div className='disclaimer__wrapper'>
          <Dialog ref='disclaimer' className='disclaimer' open={this.state.openDialog}>
            <DialogTitle className="subscribe-title">Subscription Services!</DialogTitle>
            <DialogContent>
              <form className="subscribe-form"onSubmit={this.handleSubmit}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="fname" name="firstName" value={this.state.firstName}
                    onChange={this.handleChange} />
                  <label className="mdl-textfield__label" htmlFor="fname">First name</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="lname" name="lastName" value={this.state.lastName}
                    onChange={this.handleChange} />
                  <label className="mdl-textfield__label" htmlFor="lname">Last name</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="email" id="email" name="email" value={this.state.email}
                    onChange={this.handleChange} />
                  <label className="mdl-textfield__label" htmlFor="email">Email</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="tel" pattern="[0-9]*" id="phone" name="phone" value={this.state.phone}
                    onChange={this.handleChange} />
                  <label className="mdl-textfield__label" htmlFor="phone">Phone</label>
                  <span className="mdl-textfield__error">Digits only</span>
                </div>
                
                <input className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button mdl-js-button mdl-button--raised"
                       type="submit" value="Submit" />
                <input className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                       type="reset" />
                <input className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color--red"
                       type="button" value="Cancel" onClick={this.handleCloseDialog} />
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default PopupTitle
