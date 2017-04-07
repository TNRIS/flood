import { connect } from 'react-redux'

import {
  clearCenterAndZoom,
  clearPopup,
  setCenterAndZoom,
  setPopup
} from '../actions/MapActions'

import * as actions from '../actions'

import { showSnackbar } from '../actions/ToasterActions'
import Map from '../components/Map'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  function clickHandler(id, data) {
    // This allows the poups to open when multiple layers are turned on
    if (data.data) {
      console.log(data.data)
      const payload = {}
      payload.id = id
      payload.data = data
      dispatch(setPopup(payload))
    }
  }

  return {
    onLayerStatusChange: (id, status) => {
      dispatch(actions.layerStatusChange(id, status))
    },
    onClickAlerts: clickHandler,
    onClickUTFGrid: clickHandler,
    updateTimestamp: (timestamp) => {
      dispatch(actions.updateTimestamp(timestamp))
    },
    clearCenterAndZoom: () => {
      dispatch(clearCenterAndZoom())
    },
    showSnackbar: (toppings) => {
      dispatch(showSnackbar(toppings))
    },
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
