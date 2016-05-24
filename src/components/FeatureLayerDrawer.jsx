import React, { PropTypes } from 'react'
import { Drawer, Navigation } from 'react-mdl'

import FeatureLayer from './FeatureLayer'
import ResourceLink from './ResourceLink'

import TWDBLogoImage from '../images/twdb_white.png'
import TexasFloodLogoImage from '../images/texas_flood_logo_transparent.png'

const FeatureLayerDrawer = ({ layers, onLayerClick }) => {
  return (
    <Drawer className="nav">
      <div className="nav__head">
        <div className="nav__title">
          <a href="http://texasflood.org">
            <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo" />
          </a>
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
            legend={layer.legend}
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
          <ResourceLink text="Preparing Before Flood" href="http://www.twdb.texas.gov/flood/prep/before.asp" />
          <ResourceLink text="Being Safe During Flood" href="http://www.twdb.texas.gov/flood/prep/during.asp" />
          <ResourceLink text="Recovering After Flood" href="http://www.twdb.texas.gov/flood/prep/after.asp" />
        </Navigation>
      </div>

      <div className="footer">
        <div className="footer__wrapper">
          <a className="footer__twdb-logo" href="http://www.twdb.texas.gov">
            <img src={TWDBLogoImage} alt="The Texas Water Development Board logo" />
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
