/*global L*/

import React from 'react'
import R from 'ramda'

const Map = React.createClass({
  getInitialState() {
    return {}
  },
  componentDidMount() {
    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 7
      })

      this.setActiveBaseLayer(this.props)
    }, 0)
  },
  componentWillUpdate(nextProps) {
    this.setActiveBaseLayer(nextProps)
  },
  getActiveLayer(props) {
    const activeLayer = R.find(layer => layer.id === props.active, props.layers)
    return L.tileLayer(activeLayer.tileUrl, {
      attribution: activeLayer.attribution
    })
  },
  setActiveBaseLayer(props) {
    if (this.baseLayer) {
      this.map.removeLayer(this.baseLayer)
    }
    this.baseLayer = this.getActiveLayer(props)
    this.baseLayer.addTo(this.map)
  },
  render() {
    return (
      <div className="map">
        <div ref="map" className="map--full">
        </div>
      </div>
    )
  },
})

export default Map
