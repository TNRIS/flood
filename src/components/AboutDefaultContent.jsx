import React from "react"

const AboutDefaultContent = () => {
  return (
    <>
      <h5>Disclaimer</h5>
      <p className="about-disclaimer-text">
        The data and information presented in this viewer is the best available
        information provided to the Texas Water Development Board (TWDB) by its
        data contributors. The information may not be represented in real-time
        and should not be considered as exact conditions in your area. Neither
        the State of Texas nor the Texas Water Development Board (TWDB) assumes
        any legal liability or responsibility or makes any guarantees or
        warranties as to the accuracy, completeness, or suitability of the
        information for any purpose. If you have any questions, please contact
        us at{" "}
        <a href="https://tnris.org/contact/" target="_blank">
          https://tnris.org/contact/
        </a>
      </p>
      <h5 className="data-sources">Data Sources</h5>
      <p className="data-sources-list">
        Flood Gages:
        <br />
        <a href="https://water.weather.gov/ahps/" target="_blank">
          National Weather Service
        </a>
        <br />
        Reservoir Conditions:
        <br />
        <a
          href="https://waterdatafortexas.org/reservoirs/statewide"
          target="blank"
        >
          Texas Water Development Board
        </a>
        <br />
        Weather Alerts and Warnings:
        <br />
        <a href="https://www.aerisweather.com/" target="_blank">
          Aeris Weather Service
        </a>
        <br />
        SMS Text Services:
        <br />
        <a href="https://aws.amazon.com/" target="_blank">
          Amazon Web Services
        </a>
      </p>
    </>
  )
}

export default AboutDefaultContent
