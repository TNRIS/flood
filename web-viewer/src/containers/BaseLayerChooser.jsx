import { connect } from 'react-redux'

import { setBaseLayer } from '../actions'
import BaseLayerDrawer from '../components/BaseLayerDrawer'


const mapStateToProps = (state) => {
  return {
    layers: state.baseLayers.layers,
    active: state.baseLayers.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerClick: (id) => {
      dispatch(setBaseLayer(id))
    }
  }
}

const BaseLayerChooser = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseLayerDrawer)

export default BaseLayerChooser
