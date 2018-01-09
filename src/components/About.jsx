import React from 'react'

import twdbLogoImage from '../images/TWDBlogo_blue_transparent.png'
import tnrisLogoImage from '../images/TNRISlogo_blue_transparent.png'
import TexasFloodLogoImage from '../images/texas_flood_logo_transparent_300x42.png'

import Modal from 'react-modal'

const reactModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  }
}

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    Modal.setAppElement('#reactApp')
  }

  render() {
    return (
        <Modal className="about-modal"
               isOpen={this.props.openDialog}
               contentLabel="About Modal"
               style={reactModalStyle}>
          <div>
            <p className="about-version-number">version {VERSION}</p>
          </div>
          <div className="card about">
            <div className="card-divider about-title">
              <a href="http://texasflood.org" target="_blank">
                <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo"/>
              </a>
            </div>
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
              any purpose. If you have any questions, please contact us at
              <a href="https://tnris.org/contact/" target="_blank"> https://tnris.org/contact/</a>
              </p>
              <h5 className="data-sources">Data Sources</h5>
              <p className="data-sources-list">
              Flood Gages:<br/><a href="https://water.weather.gov/ahps/" target="_blank">National Weather Service</a><br/>
              Reservoir Conditions:<br/><a href="https://waterdatafortexas.org/reservoirs/statewide" target="blank">Texas Water Development Board</a><br/>
              Weather Alerts and Warnings:<br/><a href="https://www.aerisweather.com/" target="_blank">Aeris Weather Service</a><br/>
              SMS Text Services:<br/><a href="https://aws.amazon.com/" target="_blank">Amazon Web Services</a>
              </p>
              <h6 className="about-viewer-details-link">
                <a href="./viewer-details.html" target="_blank">More Detailed Information</a>
              </h6>
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
        </Modal>
    )
  }
}

export default About
