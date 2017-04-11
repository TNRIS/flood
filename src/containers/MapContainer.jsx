import { connect } from 'react-redux'
import L from 'leaflet'

import {
  clearCenterAndZoom,
} from '../actions/MapActions'

import {
  setPopup
} from '../actions/PopupActions'

import * as actions from '../actions'

import { showSnackbar } from '../actions/ToasterActions'
import Map from '../components/Map'

let prevClickEvent = null

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers,
    featureLayers: state.featureLayers,
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  function clickHandler(id, data, clickLocation, event) {
    if (data.data) {
      if ((!prevClickEvent || prevClickEvent.timeStamp !== event.originalEvent.timeStamp) && data.data) {
        dispatch(setPopup({id, data: data.data, clickLocation}))
      }
      prevClickEvent = event.originalEvent
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
