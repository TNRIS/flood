import React, { PropTypes } from 'react'
import { Navigation } from 'react-mdl'

import CustomPropTypes from '../CustomPropTypes'

import FeatureLayer from './FeatureLayer'

const BaseLayerChooser = ({ baseLayers, onLayerClick }) => {
  return (
    <Navigation className="nav__layers">
      {baseLayers.map(layer =>
        <FeatureLayer
          key={layer.id}
          icon={layer.icon}
          active={layer.active}
          status={layer.status}
          legend={layer.legend}
          onClick={() => onLayerClick(layer.id)}
          {...layer}
        />
      )}
    </Navigation>
  )
}

BaseLayerChooser.propTypes = {
  baseLayers: PropTypes.arrayOf(CustomPropTypes.baseLayer).isRequired,
  activeBaseId: PropTypes.string.isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default BaseLayerChooser
