import { connect } from 'react-redux'

import { layerStatusChange, hoverOverMapClickable, displayMapItemInfo } from '../actions'
import Map from '../components/Map'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
    map: state.map,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerStatusChange: (id, status) => {
      dispatch(layerStatusChange(id, status))
    },
    onClickUTFGrid: (data) => {
      dispatch(displayMapItemInfo(data))
    },
    onMouseoutUTFGrid: () => {
      dispatch(hoverOverMapClickable())
    },
    onMouseoverUTFGrid: (data) => {
      dispatch(hoverOverMapClickable(data))
    },
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer

