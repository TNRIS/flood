import React, { PropTypes } from 'react'
import { Navigation } from 'react-mdl'

import FeatureLayer from './FeatureLayer'

const FeatureLayerChooser = ({ layers, onLayerClick }) => {
  return (
      <Navigation className="nav__layers">
        {layers.map(layer =>
          <FeatureLayer
            key={layer.id}
            icon={layer.icon}
            altText={layer.altText}
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

FeatureLayerChooser.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default FeatureLayerChooser
