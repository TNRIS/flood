import { connect } from 'react-redux'

import {
  clearCenterAndZoom,
  layerStatusChange,
  updateTimestamp
} from '../actions/MapActions'

import { showSnackbar } from '../actions/ToasterActions'
import Map from '../components/Map'

import {
  clearPopup,
  setPopup
} from '../actions/PopupActions'

import { withRouter } from 'react-router'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
    map: state.map,
    popupData: state.popupData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearPopup: () => {
      dispatch(clearPopup())
    },
    onLayerStatusChange: (id, status) => {
      dispatch(layerStatusChange(id, status))
    },
    updateTimestamp: (timestamp) => {
      dispatch(updateTimestamp(timestamp))
    },
    clearCenterAndZoom: () => {
      dispatch(clearCenterAndZoom())
    },
    setPopup: (popupData) => {
      dispatch(setPopup(popupData))
    },
    showSnackbar: (toppings) => {
      dispatch(showSnackbar(toppings))
    },
  }
}

const mapWithRouter = withRouter(Map)

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(mapWithRouter)

export default MapContainer
