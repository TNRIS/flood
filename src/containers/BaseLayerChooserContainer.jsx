import { connect } from 'react-redux'

import { setBaseLayer } from '../actions'
import BaseLayerChooser from '../components/BaseLayerChooser'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers.layers,
    featureLayers: state.featureLayers.layers,
    activeBaseId: state.baseLayers.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerClick: (id) => {
      dispatch(setBaseLayer(id))
    }
  }
}

const BaseLayerChooserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseLayerChooser)

export default BaseLayerChooserContainer
