import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import FeatureLayer from './FeatureLayer'
import ResourceLink from './ResourceLink'


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

      <div className="resources">
        <div className="resources__title">
          <div className="resources__title-text">
            More Resources
          </div>
        </div>

        <Navigation className="resources__links">
          <ResourceLink text="Preparing for a Flood" href="#" />
          <ResourceLink text="Basic Safety Tips" href="#" />
          <ResourceLink text="Watches vs Warnings" href="#" />
          <ResourceLink text="Helpful Phone Numbers" href="#" />
        </Navigation>
      </div>

      <div className="footer">
        <div className="footer__developed-by">
          Made by the <br/>
          <a href="http://www.twdb.texas.gov">
            Texas Water Development Board
          </a>
        </div>
      </div>
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
