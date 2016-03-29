import { connect } from 'react-redux'

import { layerStatusChange } from '../actions'
import Map from '../components/Map'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerStatusChange: (id, status) => {
      dispatch(layerStatusChange(id, status))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer

