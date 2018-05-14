import React from 'react'
import { mount } from 'enzyme'
import KeyeventsWrapper from '../__tests__/KeyeventsWrapper'

const props = {
  keydirection: 'VERTICAL',
}

describe('<KeyeventsWrapper />', () => {
  const wrapper = mount(<KeyeventsWrapper {...props} />)
  it('should render DOWN_ARROW and UP_ARROW if keydirection vertical is selected', () => {
    wrapper
      .find('a')
      .at(0)
      .simulate('click')
    wrapper.update()
    wrapper
      .instance()
      .handleChange({ key: 'ArrowDown', preventDefault: () => {} })
    wrapper.update()
    expect(document.activeElement.innerHTML).toBe('test2')
  })
  it('should render DOWN_ARROW and UP_ARROW if keydirection vertical is selected', () => {
    wrapper
      .find('a')
      .at(1)
      .simulate('click')
    wrapper
      .instance()
      .handleChange({ key: 'ArrowUp', preventDefault: () => {} })
    expect(document.activeElement.innerHTML).toBe('test1')
  })
})
