import React from 'react'
import PropTypes from 'prop-types'

import FeatureLayer from './FeatureLayer'

const FeatureLayerChooser = ({ layers, onLayerClick }) => {
  return (
      <ul className="vertical menu nav-layers">
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
      </ul>
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
