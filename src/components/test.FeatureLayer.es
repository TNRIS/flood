import { expect } from 'chai'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { RingLoader } from 'react-spinners'
import FeatureLayer from '../components/FeatureLayer'

function setup(overrides) {
  let props = Object.assign({
    onClick: () => {return false},
    text: 'testing',
    icon: 'http://example.com/testing',
    active: false,
    status: null,
  }, overrides)

  let renderer = new ShallowRenderer()
  renderer.render(<FeatureLayer {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('component: FeatureLayer', () => {
  it('should render correctly', () => {
    const { output } = setup({
      text: 'hullo test',
      icon: '/tarst.png',
    })

    expect(output.type).to.equal('li')
    let wrapperDiv = output.props.children
    expect(wrapperDiv.type).to.equal('div')
    let linkClicker = wrapperDiv.props.children[0]
    expect(linkClicker.type).to.equal('a')

    let innerDiv = linkClicker.props.children[0]
    let [ icon, text, statusWrapper ] = innerDiv.props.children
    expect(text.props.children).to.equal('hullo test')

    let image = icon.props.children
    expect(image.type).to.equal('img')
    expect(image.props.src).to.equal('/tarst.png')
  })

  it('should render with Spinner when active and not ready', () => {
    const { output } = setup({
      status: 'pending',
      active: true,
    })

    let innerDiv = output.props.children.props.children[0].props.children[0]
    let [ span, text, statusWrapper ] = innerDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).to.deep.equal(RingLoader)
  })

  it('should render with Checkbox when active and ready', () => {
    const { output } = setup({
      status: 'ready',
      active: true,
    })

    let wrapperDiv = output.props.children
    let linkClicker = wrapperDiv.props.children[0]
    let innerDiv = linkClicker.props.children[0]
    let [ icon, text, statusWrapper ] = innerDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).to.equal('div')
  })

  it('should render with Checkbox when not active or ready', () => {
    const { output } = setup({
      status: 'pending',
      active: false,
    })

    let wrapperDiv = output.props.children
    let linkClicker = wrapperDiv.props.children[0]
    let innerDiv = linkClicker.props.children[0]
    let [ icon, text, statusWrapper ] = innerDiv.props.children
    let statusIndicator = statusWrapper.props.children

    expect(statusIndicator.type).to.equal('div')
  })
})
