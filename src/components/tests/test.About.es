import React from 'react'
import expect from 'expect'
import { render, shallow } from 'enzyme'

import About from '../About'

describe('component: About', () => {
  it('should render About dialog div with about__wrapper class', () => {
    expect(shallow(<About />).is(".about__wrapper")).toEqual(true)
  })
  it('should render About dialog with legal review and disclaimer heading', () => {
    const wrapper = render(<About />)
    expect(wrapper.find('h4').text()).toContain('Legal Review and Disclaimer')
  })
})
