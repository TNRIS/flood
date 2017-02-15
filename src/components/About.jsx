import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'


class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      const dialog = ReactDOM.findDOMNode(this.refs.about)
      if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog)
      }
  }

  render() {
    return (
      <div className='about__wrapper'>
        <Dialog ref='about' className='aboutDialog' open={this.props.openDialog}>
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <h4>Purpose</h4>
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
            <h4>Data</h4>
            <p>
            The data presented in this application is collected from both public and
            private contributors. <br />
            Flood Gage readings are provided by the National Oceanic & Atmospheric Administration&#39;s 
            National Weather Service (NOAA NWS). The data within this application is 
            pulled directly from NOAA&#39;s database and displayed within this application. 
            The application re-pulls the flood gage data from NOAA every 5 minutes.
            The stage levels are predefined by NOAA and represented with this application 
            mirroring their default symbology. For more information on flood gage readings, 
            please visit NOAA&#39;s website at: 
            <a href="http://water.weather.gov/ahps/"> http://water.weather.gov/ahps/</a><br />

            </p>
            <h4>Subscriptions</h4>
            <p>
            The application provides the ability for users to subscribe to flood
            gages in order to receive alerts when gage readings are staged at potentially
            dangerous levels. These levels are designated as Action, Flood, Moderate, and Major. <br /> 
            Users may subscribe to receive alerts via SMS text message or email. TNRIS maintains a 
            strict privacy policy and will never, under any circumstance, share or disclose 
            a users contact information with any other entities or utilize their contact 
            information for any purpose other than that which the user has signed up for. <br />
            A single alert is sent out for each individual gage when it enters one of the dangerous 
            levels. As water levels continue to change during a weather event, single alerts will 
            continue to be sent out as a particular gage transitions through the various dangerous 
            stage levels. 
            Subscriptions are applied for individual gages. This means that if a user wishes to 
            subscribe to multiple gages, the user must deliberately complete the subscription form 
            for each gage they wish to receive alerts for. <br />
            To unsubscribe from alerts, click the <i>Manage Subscriptions</i> button within the 
            panel on the left side of the application. This will open the subscription management 
            dialog where the user can review all the gages they are currently subscribed to and 
            remove all subscriptions they no longer wish to receive. Subscriptions and alert messages 
            are managed by Amazon Web Services (AWS). <br /> Alternative to the subscription management 
            dialog, AWS provides default functionality which allows the user to unsubscribe from alerts 
            directly from the alert message itself. Every email alert provides a direct link within 
            the message which you can click to unsubscribe the email address from the particular 
            gage which sent the alert. A user can respond to a SMS text message alert at 
            any time with the message &#39;STOP&#39; to opt-out of all SMS text message alerts from TNRIS&#39; 
            AWS alert system. <br />
            <b>Warning: texting &#39;STOP&#39; will completely disable your phone number 
            from receiving SMS alerts from any TNRIS application. You will no longer be able to re-subscribe 
            to receive flood gage alerts.</b> If you have texted &#39;STOP&#39; in response to the alerts but 
            wish to resubscribe, you must contact TNRIS support at <a href="https://tnris.org/contact/"> 
            https://tnris.org/contact/</a> to request to opt your phone number back in to the TNRIS AWS 
            alert system.
            </p>
          </DialogContent>
          <DialogActions className="dialog-button-div">
                <Button raised colored className="terms-agree-button" type='button' onClick={this.props.hideAbout}>
                Close
                </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default About
