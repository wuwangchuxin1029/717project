import React,{ Component } from 'react'
import './header.scss'

class Header extends Component{
  constructor(){
    super()
    this.goBack = this.goBack.bind(this)
  }
    render () {
      return (
            <header className="add_header">
              <span className="iconfont icon-xiangzuo1" onClick={this.goBack}></span>
              <p>{this.props.children}</p>
              <span className="iconfont icon-shouye-"></span>
            </header>
      )
    }
    goBack(){
      this.props.history.go(-1)
    }
}
export default Header