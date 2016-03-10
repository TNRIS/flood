import { connect } from 'react-redux'

import { setLayer } from '../actions'
import LayerDrawer from '../components/LayerDrawer'


const mapStateToProps = (state) => {
  return {
    layers: state.layers.layers,
    active: state.layers.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerClick: (id) => {
      dispatch(setLayer(id))
    }
  }
}

const LayerChooser = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerDrawer)

export default LayerChooser
