import { connect } from 'react-redux'

import {
  clearCenterAndZoom,
} from '../actions/MapActions'

import * as actions from '../actions'

import { showSnackbar } from '../actions/ToasterActions'
import Map from '../components/Map'

import {
  clearPopup,
  setPopup
} from '../actions/PopupActions'


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
      dispatch(actions.layerStatusChange(id, status))
    },
    updateTimestamp: (timestamp) => {
      dispatch(actions.updateTimestamp(timestamp))
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

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
