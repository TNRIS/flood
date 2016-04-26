import React from 'react'

const ResourceLink = ({ text, href }) => {
  return (
    <a className="mdl-navigation__link resources__link" href={href}>
      {text}
    </a>
  )
}

export default ResourceLink
