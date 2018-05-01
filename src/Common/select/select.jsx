import React,{ Component } from 'react'
import './select.scss'
// select组件，虽然有onChange事件，但它是非受控组件
class Select extends Component{
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
      <select name="" id="" onChange={this.getValue} className="select_component">
        <option value="北京">北京</option>
        <option value="上海">上海</option>
        <option value="广州">广州</option>
        <option value="深圳">深圳</option> 
      </select>
    )
  }
}
export default Select
