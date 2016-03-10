import { connect } from 'react-redux'

import Map from '../components/Map'


const mapStateToProps = (state) => {
  return {
    layers: state.layers.layers,
    active: state.layers.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer

