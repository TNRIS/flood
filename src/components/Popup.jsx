import React, { PropTypes } from 'react'

const Popup = React.createClass({
  propTypes: {
    leafletMap: PropTypes.object,
    popupInfo: PropTypes.object,
  },
  componentDidMount() {
    this.popup
  },
  render() {
    const leafletMap = this.props.leafletMap
    const popupInfo = this.props.popupInfo

    if (leafletMap && popupInfo) {
      this.popup = L.popup()
        .setLatLng(popupInfo.latlng)
        .setContent(JSON.stringify(popupInfo.data))
        .openOn(leafletMap)
    } else if (leafletMap && this.popup && !popupInfo) {
      leafletMap.closePopup()
    }

    return null
  }
})

export default Popup
