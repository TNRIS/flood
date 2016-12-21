import { connect } from 'react-redux'

import { setFeatureLayer } from '../actions'
import { setGaugeSource } from '../actions'
import FeatureLayerDrawer from '../components/FeatureLayerDrawer'


const mapStateToProps = (state) => {
  return {
    layers: state.featureLayers.layers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLayerClick: (id) => {
      dispatch(setFeatureLayer(id))
    }
  }
}

const FeatureLayerChooser = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureLayerDrawer)

export default FeatureLayerChooser
