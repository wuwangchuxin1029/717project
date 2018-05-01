import React, { Component } from 'react'
import './button.scss'

class Button extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="button_wrap">
        {this.props.children}
      </button>
    )
  }
}
export default Button