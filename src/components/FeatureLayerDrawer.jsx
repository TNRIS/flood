import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import FeatureLayer from './FeatureLayer'

const FeatureLayerDrawer = ({ layers, onLayerClick }) => {
  return (
    <Drawer>
      <Navigation>
        {layers.map(layer =>
          <FeatureLayer
            key={layer.id}
            icon={layer.icon}
            active={layer.active}
            status={layer.status}
            onClick={() => onLayerClick(layer.id)}
            {...layer}
          />
        )}
      </Navigation>
    </Drawer>
  )
}

FeatureLayerDrawer.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default FeatureLayerDrawer
