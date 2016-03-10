import { connect } from 'react-redux'

import { setBaseLayer } from '../actions'
import BaseLayerMenu from '../components/BaseLayerMenu'

const mapStateToProps = (state) => {
  return {
    baseLayers: state.baseLayers.layers,
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

const BaseLayerMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseLayerMenu)

export default BaseLayerMenuContainer
