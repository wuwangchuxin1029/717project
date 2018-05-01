import React,{ Component } from 'react'
import './input.scss'

class Input extends Component{
  constructor(){
    super()
    this.getValue = this.getValue.bind(this)
  }
  // 监听onChange事件,将input的value传递给onChange，在调用组件时可以获取到input的value
  getValue(e){
    this.props.onChange(e.target.value)
  }
  render () {
    return (
      <input 
        type="text" 
        placeholder={this.props.placeholder} 
        className="inp_component"
        onChange={this.getValue}
      />
    )
  }
}
export default Input
