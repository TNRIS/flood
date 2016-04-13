import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import { Checkbox, Spinner } from 'react-mdl'
import FeatureLayer from '../components/FeatureLayer'

function setup(overrides) {
  let props = Object.assign({
    onClick: expect.createSpy(),
    text: 'testing',
    icon: 'http://example.com/testing',
    active: false,
    status: null,
  }, overrides)

  let renderer = TestUtils.createRenderer()
  renderer.render(<FeatureLayer {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('component: FeatureLayer', () => {
  it('should render with Spinner when active and not ready', () => {
    const { output } = setup({
      status: 'pending',
      active: true,
    })

    expect(output.type).toBe('a')

    let wrapperDiv = output.props.children
    let [ span, text, statusWrapper ] = wrapperDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).toBe(Spinner)
  })

  it('should render with Checkbox when active and ready', () => {
    const { output } = setup({
      status: 'ready',
      active: true,
    })

    expect(output.type).toBe('a')

    let wrapperDiv = output.props.children
    let [ span, text, statusWrapper ] = wrapperDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).toBe(Checkbox)
  })

  it('should render with Checkbox when not active or ready', () => {
    const { output } = setup({
      status: 'pending',
      active: false,
    })

    expect(output.type).toBe('a')

    let wrapperDiv = output.props.children
    let [ span, text, statusWrapper ] = wrapperDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).toBe(Checkbox)
  })
})
