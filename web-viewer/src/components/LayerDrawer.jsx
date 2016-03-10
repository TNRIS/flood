import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import Layer from './Layer'

const LayerDrawer = ({ layers, onLayerClick }) => {
  return (
    <Drawer title="Layers">
      <Navigation>
        {layers.map(layer =>
          <Layer
            key={layer.id}
            onClick={() => onLayerClick(layer.id)}
            {...layer}
          />
        )}
      </Navigation>
    </Drawer>
  )
}

LayerDrawer.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  active: PropTypes.string.isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default LayerDrawer
