import React from 'react'
import { expect } from 'chai'
import ShallowRenderer from 'react-test-renderer/shallow'

import About from '../About'
import Modal from 'react-modal'

describe('componentz: About', () => {
  let renderer = new ShallowRenderer()
  renderer.render(<About />)
  let output = renderer.getRenderOutput()

  it('should render About modal with class "about-modal"', () => {
    expect(output.props.className).to.equal('about-modal')
  })

  it('should render About modal type of react-modal', () => {
    expect(output.type).to.equal(Modal)
  })

  it('should render About modal with disclaimer heading & legal text', () => {
    const aboutCard_wrapper = output.props.children[1]
    const aboutCard_sectionContent = aboutCard_wrapper.props.children[1]

    const disclaimerHeading = aboutCard_sectionContent.props.children[0]
    expect(disclaimerHeading.type).to.equal('h5')
    expect(disclaimerHeading.props.children).to.equal('Disclaimer')

    const legalText = aboutCard_sectionContent.props.children[1]
    expect(legalText.type).to.equal('p')
    expect(legalText.props.className).to.equal('about-disclaimer-text')
  })
})
