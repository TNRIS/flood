import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import BaseLayer from './BaseLayer'

const BaseLayerDrawer = ({ layers, onLayerClick }) => {
  return (
    <Drawer title="Layers">
      <Navigation>
        {layers.map(layer =>
          <BaseLayer
            key={layer.id}
            onClick={() => onLayerClick(layer.id)}
            {...layer}
          />
        )}
      </Navigation>
    </Drawer>
  )
}

BaseLayerDrawer.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  active: PropTypes.string.isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default BaseLayerDrawer
