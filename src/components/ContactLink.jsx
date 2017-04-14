import React from 'react'

const ContactLink = ({ text, href, target }) => {
  return (
    <a className="mdl-navigation__link resources__link" href={href} target={target}>{text}</a>
  )
}

export default ContactLink
