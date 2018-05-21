import React, { Component } from 'react'

import twdbLogoImage from '../images/TWDBlogo_blue_transparent.png'
import tnrisLogoImage from '../images/TNRISlogo_blue_transparent.png'
import TexasFloodLogoImage from '../images/texas_flood_logo_transparent_300x42.png'

import Modal from 'react-modal'

const reactModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  }
}

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "default"
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('#reactApp')
  }

  toggleDetails () {
    if (this.state.display == "default") {
      this.setState({
        display: "details"
      })
    }
    else {
      this.setState({
        display: "default"
      })
    }
  }

  render() {
    let versionNumber
    if (typeof VERSION === 'undefined') {
      versionNumber = ""
    } else {
      versionNumber = "version " + VERSION
    }

    let AboutContent
    if (this.state.display == "default") {
      AboutContent = (
        <div className="card-section about-text">
          <h5>Disclaimer</h5>
          <p className="about-disclaimer-text">
          The data and information presented in this viewer is the best available
          information provided to the Texas Water Development Board (TWDB) by its
          data contributors. The information may not be represented in real-time
          and should not be considered as exact conditions in your area. Neither
          the State of Texas nor the Texas Water Development Board (TWDB) assumes
          any legal liability or responsibility or makes any guarantees or warranties
          as to the accuracy, completeness, or suitability of the information for
          any purpose. If you have any questions, please contact us at <a href="https://tnris.org/contact/" target="_blank">https://tnris.org/contact/</a>
          </p>
          <h5 className="data-sources">Data Sources</h5>
          <p className="data-sources-list">
          Flood Gages:<br/><a href="https://water.weather.gov/ahps/" target="_blank">National Weather Service</a><br/>
          Reservoir Conditions:<br/><a href="https://waterdatafortexas.org/reservoirs/statewide" target="blank">Texas Water Development Board</a><br/>
          Weather Alerts and Warnings:<br/><a href="https://www.aerisweather.com/" target="_blank">Aeris Weather Service</a><br/>
          SMS Text Services:<br/><a href="https://aws.amazon.com/" target="_blank">Amazon Web Services</a>
          </p>
          <h6 className="about-viewer-details-link">
            <button className="button terms-agree-button" type="button" onClick={this.toggleDetails}>
              More Detailed Information
            </button>
          </h6>
        </div>
      )
    }
    else {
      AboutContent = (
        <div className="card-section about-text">
          <h5>Alert Definition</h5>
          <p className="about-disclaimer-text">
          The word "Alert", when used by and in relation to this application, and all associated
          messages and notifications, means a forwarded status notification that the information
          received by the Texas Water Development Board, TNRIS, and this software indicates a
          condition of significance (as defined by the data source itself) is potentially
          occuring on a flood gage. The forwarded information is a broadcasted status of the
          mechanical gages maintained by outside parties and does not mean any flooding is
          occurring by any standard other than that as defined by the gage owner and data
          source. <strong>This does not mean alerts should not be taken seriously.</strong>
          </p>
          <h5>Flood Gages</h5>
          <p className="about-disclaimer-text">
          The data presented in this application is collected from both public and private contributors. 
          Flood gage readings are acquired from the National Oceanic & Atmospheric Administration's National Weather Service
          (NOAA NWS). The data within this application is pulled directly from NOAA's database and displayed within this
          application. The viewer refreshes the flood gage data from NOAA every 5 minutes; however, NOAA may take up to one
          hour for their gages to officially update.
          <br /><br />
          Flood gages are symbolized within the map by their water levels and flood stages as designated by the data source.
          Flood gages may inconsistently contain predictive water level and flood stage information. If a flood gage does
          contain predictive information and this information signifies a potentially dangerous level, the highest predicted
          flood stage level will be symbolized on the gage point as a halo colored to represent said stage. These potentially
          dangerous levels are designated as Action, Minor, Moderate, and Major flood stages.
          </p>
          <h5>Weather Radar</h5>
          <p className="about-disclaimer-text">
          The data is acquired from the Aeris Maps Platform (AMP). This is a national dataset
          displaying rain, snow, and ice precipitation in decibel relative to Z (dBZ) units. By default, the Weather Radar layer
          displays the most recent still radar. By pressing the “PLAY” button in the bottom left corner of the map, the layer
          will animate, cycling through 5 still radar captures spanning approximately 4 hours and 10 minutes at approximately 50
          minute intervals. The application refreshes the weather radar data from the AMP every 6 minutes. This is the same
          interval Aeris updates the radar data. For more information on the Weather Radar, please visit the <a href="https://www.aerisweather.com" target="_blank">Aeris Weather Website</a>.
          </p>
          <h5>Weather Alerts</h5>
          <p className="about-disclaimer-text">
          The data is acquired from the Aeris Weather application programming interface (API). This is a national dataset of all active US
          advisories issued by the NWS, which issues a variety of severe weather warnings,
          watches, advisories, and statements that may be issued for a single forecast zone or county, or for a large region.
          The application refreshes the weather alerts data from the Aeris Weather API every 1 minute. For more information on
          the Weather Alerts, please visit the <a href="https://www.aerisweather.com" target="_blank">Aeris Weather Website</a>.
          </p>
          <h5>Lake Conditions</h5>
          <p className="about-disclaimer-text">
          The data is acquired from the Texas Water Development Board's Water Data for Texas (WDFT)
          project. This is a Texas statewide dataset displaying current lake water storage levels as part of a graphical display
          including storage levels up to 13 months before the current date. The application refreshes the weather alerts data
          from the WDFT database every 30 minutes. For more information on the Lake Conditions, please visit the <a href="https://waterdatafortexas.org" target="_blank">Water Data for Texas Website</a>.
          </p>
          <h5>Gage Notifications (Alert Subscriptions)</h5>
          <p className="about-disclaimer-text">
          The viewer provides the ability for users to “subscribe” to flood gages to receive alerts when gage readings are
          currently at or predicted by the gage reading source to enter potentially dangerous levels. These potentially dangerous
          levels are designated as Action, Minor, Moderate, and Major flood stages. Users may subscribe to any gage to receive
          alerts via a Short Message Service (SMS) text message. Users can subscribe to multiple gages by subscribing to each gage
          individually.
          </p>
          <p className="about-disclaimer-text">
          (Note: The Texas Water Development Board (TWDB) maintains a strict <a href="http://www.twdb.texas.gov/policies/site/index.asp" target="_blank">
          privacy policy</a> and will not utilize user contact information for any purpose other than that for which the user has signed up.)
          </p>
          <p className="about-disclaimer-text">
          To unsubscribe from alerts, click the “MY GAGE ALERTS” button within the left panel of the application. This will
          open the subscription management dialog where the user can review all the gages they are currently subscribed to.
          The user can modify or remove any subscription they no longer wish to receive. Subscriptions and alert messages are
          managed by Amazon Web Services (AWS). 
          </p>
          <p className="about-disclaimer-text">
          Users can elect to receive either <b>current</b> stage change alerts and/or <b>predictive</b> stage alerts (by default,
          both are enabled on all user accounts). Users can alter which alerts their account will receive by logging into their
          account within the application and clicking 'Settings' at the bottom of their subscription list. They can then toggle
          each alert type switch and save to update their account. Changing this setting will immediately update the alerts sent for
          the gages they are presently subscribed to and all new gage subscriptions added in the future.
          <br /><br />
          The status of these alert type settings are represented both in the user's subscription list and in the new subscription
          dialogue window as two circular badges. The badge for the current alert setting contains a 'C' while the badge for the
          predictive alert settings contains a 'P'. Each will be blue when enabled and gray when disabled.
          </p>
          <h6>CURRENT:</h6>
          <p className="about-disclaimer-text">
          A single alert is sent out for each individual gage when it enters one of the potentially dangerous flood stages mentioned
          above. As water levels continue to change during a weather event, single alerts will continue to be sent out as a gage
          transitions through the various stage levels.
          </p>
          <h6>PREDICTIVE:</h6>
          <p className="about-disclaimer-text">
          Predictive flood gage information is inconsistently provided for various gages based on the gage's current stage, weather
          events, and the physical ability for each gage to generate this data. When a gage receives a new set of predictive data,
          a single alert is sent out notifying the highest predicted flood stage expected to be reached for that gage (if the highest
          predicted flood stage is one of the potentially dangerous stages mentioned above). As water levels continue to change
          and new predictive data is acquired, single alerts will continue to be sent out the latest highest predicted flood stage but
          only if the latest highest predicted flood stage is a higher stage than the one previously alerted.
          </p>
          <h6 className="about-viewer-details-link">
            <button className="button terms-agree-button" type="button" onClick={this.toggleDetails}>
              Less Detailed Information
            </button>
          </h6>
        </div>
      )
    }

    return (
        <Modal className="about-modal"
               isOpen={this.props.openDialog}
               contentLabel="About Modal"
               style={reactModalStyle}>
          <div className="about-modal-x">
             <a onClick={this.props.hideAbout}><i className="fa fa-times"></i></a>
          </div>
          <div className="about-modal-body">
            <div className="card about">
              <div className="card-divider about-title">
                <a href="http://texasflood.org" target="_blank">
                  <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo"/>
                </a>
              </div>
              <div>
                <p className="about-version-number">{versionNumber}</p>
              </div>
              {AboutContent}
              <div className="card-section about-text">
                <p className="about-developed-by">Developed By</p>
                <div className="about-logos">
                  <a className="about-twdb-logo" href="http://www.twdb.texas.gov" target="_blank">
                    <img src={twdbLogoImage} alt="The Texas Water Development Board logo"/>
                  </a>
                  <a className="about-tnris-logo" href="http://www.tnris.org" target="_blank">
                    <img src={tnrisLogoImage} alt="Texas Natural Resources Information System logo"/>
                  </a>
                </div>
              </div>
              <div className="about-button-div">
                <button className="button terms-agree-button" type="button" onClick={this.props.hideAbout}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
    )
  }
}
