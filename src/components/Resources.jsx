import React from 'react'
import { Navigation } from 'react-mdl'

import ResourceLink from './ResourceLink'
import AboutLinkContainer from '../containers/AboutLinkContainer'

const Resources = () => {
  const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION
  return (
      <div className="resources">
        <h4 className="resources__header">Flood Resources</h4>
        <Navigation className="resources__links">
          <ResourceLink text="Preparing"
                        title="Before a Flood"
                        href="http://www.twdb.texas.gov/flood/prep/before.asp" target="before"/>
          <ResourceLink text="Staying Safe"
                        title="During a Flood"
                        href="http://www.twdb.texas.gov/flood/prep/during.asp" target="during"/>
          <ResourceLink text="Recovering"
                        title="After a Flood"
                        href="http://www.twdb.texas.gov/flood/prep/after.asp" target="after"/>
          <AboutLinkContainer />
          <ResourceLink text="Contact Us" href={contactLink} target="_top"/>
        </Navigation>
      </div>
  )
}

export default Resources
