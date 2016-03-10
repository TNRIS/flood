/*global L*/

import React, { PropTypes } from 'react'
import R from 'ramda'

import CustomPropTypes from '../CustomPropTypes'

const Map = React.createClass({
  propTypes: {
    baseLayers: PropTypes.shape({
      layers: PropTypes.arrayOf(CustomPropTypes.baseLayer),
      active: PropTypes.string
    })
  },
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
    if (this.props.baseLayers.active !== nextProps.baseLayers.active) {
      this.setActiveBaseLayer(nextProps)
    }
  },
  setActiveBaseLayer(props) {
    if (this.baseLayer) {
      this.map.removeLayer(this.baseLayer)
    }

    const activeBaseLayer = R.find(baseLayer => baseLayer.id === props.baseLayers.active, props.baseLayers.layers)
    this.baseLayer = L.tileLayer(activeBaseLayer.tileUrl, {
      attribution: activeBaseLayer.attribution
    })

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
