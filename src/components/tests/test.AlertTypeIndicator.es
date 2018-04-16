import React from 'react'
import { expect, assert } from 'chai'
import ShallowRenderer from 'react-test-renderer/shallow'

import AlertTypeIndicator from '../AlertTypeIndicator'

describe('component: AlertTypeIndicator', () => {
  let renderer = new ShallowRenderer()
  renderer.render(<AlertTypeIndicator />)
  let output = renderer.getRenderOutput()

  it('should render AlertTypeIndicator with class "alert-type-indicator"', () => {
    expect(output.props.className).to.equal('alert-type-indicator')
  })

  it('should render AlertTypeIndicator type of div', () => {
    expect(output.type).to.equal('div')
  })

  it('should render AlertTypeIndicator with proper Current badge', () => {
    const currentBadge = output.props.children[0]

    expect(currentBadge.type).to.equal('span')
    expect(currentBadge.props.className).to.equal('badge turned-off')
    assert.isFunction(currentBadge.props.onClick)
    expect(currentBadge.props.children).to.equal('C')
  })

  it('should render AlertTypeIndicator with proper Predictive badge', () => {
    const predictiveBadge = output.props.children[1]

    expect(predictiveBadge.type).to.equal('span')
    expect(predictiveBadge.props.className).to.equal('badge turned-off')
    assert.isFunction(predictiveBadge.props.onClick)
    expect(predictiveBadge.props.children).to.equal('P')
  })
})
