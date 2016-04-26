import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import FeatureLayer from './FeatureLayer'

const FeatureLayerDrawer = ({ layers, onLayerClick }) => {
  return (
    <Drawer className="nav">
      <div className="nav__head">
        <div className="nav__title">
          Texa<span className="nav__title-kernfix">s</span>Flood.org
        </div>
        <div className="nav__subtitle">
          Tools for Texans to track flood conditions in their area, in real-time.
        </div>
      </div>
      <Navigation className="nav__layers">
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
