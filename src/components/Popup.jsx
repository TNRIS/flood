import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'




export default class Popup extends Component {
  static propTypes = {
    leafletMap: PropTypes.object,
    popupInfo: PropTypes.object,
    position: PropTypes.object,
    data: PropTypes.object,
  }

  constructor () {
    super()
    this.maxWidth = 600
  }

  componentDidMount() {
    this.leafletPopup = L.popup({
      maxWidth: this.maxWidth
    })
  }

  componentDidUpdate(prevProps) {
    const { position, data, leafletMap } = this.props

    // should only happen the first time map after map has initialized
    if ( !prevProps.leafletMap && leafletMap ) {
      this.updatePopupSize()
      leafletMap.on('resize', () => this.updatePopupSize())
    }

    if (position !== prevProps.position) {
      this.leafletPopup.setLatLng(position)
    }

    if (data) {
      this.leafletPopup.openOn(leafletMap)
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
      )

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

  updatePopupSize() {
    const { leafletMap } = this.props
    const size = leafletMap.getSize()
    const newMaxWidth = size.x * 0.9
    if (newMaxWidth != this.maxWidth) {
      this.leafletPopup.options.maxWidth = newMaxWidth
    }
  }

  render() {
    const style = {fontSize: '2em'}
    const { layerId } = this.props

    switch (layerId) {
      case 'ahps-flood':
        return (
          <div style={style}>
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
