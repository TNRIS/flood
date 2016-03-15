import { connect } from 'react-redux'

import Map from '../components/Map'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
    activeWeatherLayerId: state.weatherLayer.active
  }
}

const mapDispatchToProps = (/*dispatch*/) => {
  return {}
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer

