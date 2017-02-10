import React from 'react'
import { Drawer, Navigation } from 'react-mdl'

import FeatureLayerChooserContainer from '../containers/FeatureLayerChooserContainer'
import Resources from './Resources'
import Unsubscribe from './Unsubscribe'

import TWDBLogoImage from '../images/twdb_white.png'
import TexasFloodLogoImage from '../images/texas_flood_logo_transparent.png'

const FeatureLayerDrawer = () => {
  return (
    <Drawer className="nav">
      <div className="nav__head">
        <div className="nav__title">
          <a href="http://texasflood.org">
            <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo" />
          </a>
        </div>
        <div className="nav__subtitle">
          Tools for Texans to track flood conditions
        </div>
      </div>

      <FeatureLayerChooserContainer/>
      <Resources/>

      <div>
        <Navigation className="unsubscribe_form">
            <Unsubscribe text="Manage Subscriptions"/>
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

export default FeatureLayerDrawer
