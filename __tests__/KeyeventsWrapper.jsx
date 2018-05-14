import React from 'react'
import { mount } from 'enzyme'
import KeyeventsWrapper from '../KeyeventsWrapper'

const props = {
  keydirection: 'VERTICAL',
  keyelement: 'a,button',
}

describe('<KeyeventsWrapper />', () => {
  const wrapper = mount(
    <KeyeventsWrapper {...props}>
      <div>
        <a
          onClick={event => {
            event.target.focus()
          }}
          href="test.com"
        >
          one
        </a>
        <button>two</button>
        <a href="test.com">three</a>
        <a href="test.com">four</a>
        <a href="test.com">five</a>
      </div>
    </KeyeventsWrapper>
  )

  it('navigate down by keypress', () => {
    wrapper
      .find('a')
      .at(0)
      .simulate('click')
    wrapper.instance().handleChange({ keyCode: 40, preventDefault: () => {} })
    expect(document.activeElement.innerHTML).toBe('two')
  })

  it('navigate up by keypress', () => {
    wrapper.instance().handleChange({ keyCode: 38, preventDefault: () => {} })
    expect(document.activeElement.innerHTML).toBe('one')
  })

  it('navigate left by keypress', () => {
    wrapper.setProps({ keydirection: 'HORIZANTAL' })
    wrapper.instance().handleChange({ keyCode: 37, preventDefault: () => {} })
    expect(document.activeElement.innerHTML).toBe('five')
  })

  it('navigate right by keypress', () => {
    wrapper.setProps({ keydirection: 'HORIZANTAL' })
    wrapper.instance().handleChange({ keyCode: 39, preventDefault: () => {} })
    expect(document.activeElement.innerHTML).toBe('one')
  })
})
