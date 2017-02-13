import React from 'react'
import { Navigation } from 'react-mdl'

import ResourceLink from './ResourceLink'

const Resources = () => {
  return (
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
  )
}

export default Resources
