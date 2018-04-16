import { connect } from 'react-redux'

import { setBaseLayer } from '../actions/MapActions'
import BaseLayerMenu from '../components/BaseLayerMenu'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers.layers,
    featureLayers: state.featureLayers.layers,
    activeBaseId: state.baseLayers.active,
    target: state.baseLayers.target
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerClick: (id) => {
      dispatch(setBaseLayer(id))
    }
  }
}

const BaseLayerMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseLayerMenu)

export default BaseLayerMenuContainer
