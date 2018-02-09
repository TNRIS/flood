import React from 'react'

const ContactLink = ({ text, href, target }) => {
  return (
    <a className="button" href={href} target={target}>{text}</a>
  )
}

export default ContactLink
