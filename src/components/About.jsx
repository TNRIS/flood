import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from 'react-mdl'
import * as dialogPolyfill from 'dialog-polyfill'

import TWDBLogoImage from '../images/logo_twdb.png'
import tnrisLogoImage from '../images/tnris_white_transparent_bg.gif'


class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const dialog = ReactDOM.findDOMNode(this.refs.about)
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }
  }

  render() {
    return (
      <div className="about__wrapper">
        <Dialog ref="about" className="aboutDialog" open={this.props.openDialog}>
          <DialogTitle>About
            <p className="about-version-number">
              v{VERSION} - {RELEASE}
            </p>
          </DialogTitle>
          <DialogContent>
            <h4>Legal Review and Disclaimer</h4>
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
            Flood Gage readings are acquired from the National Oceanic & Atmospheric Administration&#39;s
            National Weather Service (NOAA NWS). The data within this application is
            pulled directly from NOAA&#39;s database and displayed within this application.
            The application refreshes the flood gage data from NOAA every 5 minutes
            although NOAA updates the data for each individual flood gage in their database
            at intervals no longer than every 1 hour.
            The stage levels are predefined by NOAA and represented with this application
            mirroring their default symbology. The stage levels are defined by the water
            level for each individual gage relative to their capacity.
            When a gage reaches the 'Action' stage level or higher, NOAA will algorithmically produce
            predictive water depths for the gage and provide those depths within the
            graphical charts. These predicitive levels are updated every 6 hours by NOAA
            unless a significant event demands more accurate and immediate information. In which
            case the predictive water depths will be monitored and updated more frequently.
            This means the predictive depth readings may vary and change over time.
            For more information on Flood Gage readings,
            please visit NOAA&#39;s website at:
            <a href="http://water.weather.gov/ahps/"> http://water.weather.gov/ahps/</a><br />
            Weather Radar rasters are acquired from the Aeris Weather&#39;s Aeris Maps
            Platform (AMP). This is a national dataset displaying rain, snow, and ice
            precipitation in decibel relative to Z (dBZ) units. By default, the Weather
            Radar layer displays the most recent still radar. By pressing the <i>play</i>
            button in the bottom left corner of the map, the layer will animate, cycling
            through 5 still radar captures spanning approximately 4 hours and 10 minutes
            at approximately 50 minute intervals. The application refreshes the weather
            radar data from the AMP every 6 minutes. This is the same interval Aeris
            updates the radar data. For more information on the Weather Radar, please visit
            Aeris Weather&#39;s website at:
            <a href="https://www.aerisweather.com/"> https://www.aerisweather.com/</a><br />
            Weather Alerts are acquired from the Aeris Weather&#39;s Aeris Weather API.
            This is a national dataset of all active US advisories issued by the National
            Weather Service (NWS). "The NWS issues a variety of severe weather warnings,
            watches, advisories, and statemetns that may be issued for a single forecast
            zone or county, or for a large region." The application refreshes the weather
            alerts data from the Aeris Weather API every 1 minute. For more information on
            the Weather Alerts, please visit Aeris Weather&#39;s website at:
            <a href="https://www.aerisweather.com/"> https://www.aerisweather.com/</a><br />
            Lake Conditions are acquired from the Texas Water Development Board&#39;s
            Water Data for Texas (WDFT) project. This is a Texas statewide dataset displaying current
            lake water storage levels as part of a graphical display including storage levels
            up to 13 months before the current date. The application refreshes the weather
            alerts data from the  WDFT database every 30 minutes. For more information on the
            Lake Conditions, please visit the WDFT website at:
            <a href="https://waterdatafortexas.org/"> https://waterdatafortexas.org/</a><br />
            </p>
            <h4>Subscriptions</h4>
            <p>
            ***Official subscription disclaimer goes here***<br /><br />

            The application provides the ability for users to subscribe to flood
            gages in order to receive alerts when gage readings are staged at potentially
            dangerous levels. These levels are designated as Action, Minor, Moderate, and Major. <br />
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
            alert system. <br />
            <small>*SMS charges may apply</small>
            </p>

          </DialogContent>
          <DialogActions className="dialog-button-div">
                <Button colored className="terms-agree-button" type='button' onClick={this.props.hideAbout}>
                Close
                </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default About
