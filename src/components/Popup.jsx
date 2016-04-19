import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'




export default class Popup extends Component {
  static propTypes = {
    leafletMap: PropTypes.object,
    popupInfo: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
  }

  componentDidMount() {
    this.leafletPopup = L.popup()
  }

  componentDidUpdate(prevProps) {
    const { position, data } = this.props;

    if (position !== prevProps.position) {
      this.leafletPopup.setLatLng(position);
    }

    if (data) {
      this.leafletPopup.openOn(this.props.leafletMap)
    }

    if (this.leafletPopup._isOpen) {
      this.renderPopupContent()
    }
  }

  renderPopupContent() {
    const rendered = this.render()
    if (rendered) {
      ReactDOM.render(
        rendered,
        this.leafletPopup._contentNode
      );

      this.leafletPopup.update()
    }
    else {
      this.removePopupContent()
    }
  }

  removePopupContent() {
    if (this.leafletPopup._contentNode) {
      unmountComponentAtNode(this.leafletPopup._contentNode)
    }
  }

  render() {
    switch (this.props.layerId) {
      case 'ahps-flood':
        return (
          <div>
            flood gauge!
          </div>
      )
      case 'reservoir-conditions':
        return (
          <div>
            lake!
          </div>
      )
      default:
        return null
    }
  }
}
