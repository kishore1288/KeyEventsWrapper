import React from 'react'
import PropTypes from 'prop-types'

const KEYS = {
  ENTER: 13,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  SPACE: 32,
  TAB: 9,
  SHIFT: 16,
}

class KeyeventsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedIndex: 0,
      setFocusRing: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.setFocus = this.setFocus.bind(this)
  }

  getWrapperElement = () =>
    (this.wrapper && this.wrapper.querySelectorAll(this.props.keyelement)) || []

  handleChange = event => {
    const { keydirection } = this.props
    let { focusedIndex } = this.state
    const keyCode = event.which || event.keyCode
    const ele = event.target || event.srcElement
    const size = this.getWrapperElement().length
    this.setState({ setFocusRing: true })

    switch (keyCode) {
      case KEYS.DOWN_ARROW:
        if (keydirection === 'VERTICAL') {
          event.preventDefault()
          focusedIndex = focusedIndex === size - 1 ? 0 : focusedIndex + 1
          this.setFocusIndex(focusedIndex, () => {
            this.setFocus()
          })
        }
        break

      case KEYS.UP_ARROW:
        if (keydirection === 'VERTICAL') {
          event.preventDefault()
          focusedIndex = focusedIndex === 0 ? size - 1 : focusedIndex - 1
          this.setFocusIndex(focusedIndex, () => {
            this.setFocus()
          })
        }
        break

      case KEYS.RIGHT_ARROW:
        if (keydirection === 'HORIZANTAL') {
          event.preventDefault()
          focusedIndex = focusedIndex + 1 === size ? 0 : focusedIndex + 1
          this.setFocusIndex(focusedIndex, () => {
            this.setFocus()
          })
        }
        break

      case KEYS.LEFT_ARROW:
        if (keydirection === 'HORIZANTAL') {
          event.preventDefault()
          focusedIndex = focusedIndex - 1 === -1 ? size - 1 : focusedIndex - 1
          this.setFocusIndex(focusedIndex, () => {
            this.setFocus()
          })
        }
        break

      case KEYS.TAB:
      case KEYS.SHIFT:
        this.setState({
          focusedIndex: 0,
        })
        break

      case KEYS.ENTER:
      case KEYS.SPACE:
        event.stopPropagation()
        event.preventDefault()
        ele.click()
        break
      default:
    }
  }

  setFocus = () => {
    const { focusedIndex, setFocusRing } = this.state
    if (setFocusRing) {
      const selectedListItem = this.getWrapperElement()[focusedIndex]
      if (selectedListItem) {
        selectedListItem.classList.add('focus-ring')
        selectedListItem.focus()
      }
    }
  }

  setFocusIndex = (updatedIndex, callback) => {
    this.setState(
      {
        focusedIndex: updatedIndex,
      },
      () => {
        callback()
      }
    )
  }

  setMouseEvent = event => {
    this.setState({ setFocusRing: false })
    event.target.classList.remove('focus-ring')
  }

  render() {
    const { className, children } = this.props
    return (
      // eslint-disable-next-line
      <div
        ref={element => {
          this.wrapper = element
        }}
        onKeyDown={this.handleChange}
        className={className}
      >
        {children}
      </div>
    )
  }
}

KeyeventsWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  keydirection: PropTypes.string,
  keyelement: PropTypes.string,
}

KeyeventsWrapper.defaultProps = {
  className: 'null',
  keydirection: 'null',
  keyelement: 'null',
}

export default KeyeventsWrapper
