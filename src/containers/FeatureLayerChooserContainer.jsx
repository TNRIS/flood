import { connect } from 'react-redux'

import { setFeatureLayer } from '../actions'
import FeatureLayerChooser from '../components/FeatureLayerChooser'


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

const FeatureLayerChooserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureLayerChooser)

export default FeatureLayerChooserContainer
