import React from 'react'
import { Navigation } from 'react-mdl'

import ResourceLink from './ResourceLink'
import AboutLinkContainer from '../containers/AboutLinkContainer'

const Resources = () => {
  return (
      <div className="resources">
        <h4 class="resources-header">More Resources</h4>
        <Navigation className="resources__links">
          <ResourceLink text="Preparing Before Flood" href="http://www.twdb.texas.gov/flood/prep/before.asp" target="before"/>
          <ResourceLink text="Being Safe During Flood" href="http://www.twdb.texas.gov/flood/prep/during.asp" target="during"/>
          <ResourceLink text="Recovering After Flood" href="http://www.twdb.texas.gov/flood/prep/after.asp" target="after"/>
          <AboutLinkContainer />
        </Navigation>
      </div>
  )
}

export default Resources
