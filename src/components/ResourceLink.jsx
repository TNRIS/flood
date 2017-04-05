import React from 'react'

const ResourceLink = ({ text, href, title, target }) => {
  return (
    <a className="mdl-navigation__link resources__link" href={href} target={target}>
      {text} &nbsp; <strong>{title}</strong>
    </a>
  )
}

export default ResourceLink
