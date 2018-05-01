import React, { Component } from 'react'
import { loginOut } from '../../utils/utils'
import './setting.scss'

class Setting extends Component {
  constructor() {
    super()
    this.loginOut = this.loginOut.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  render() {
    return (
      <div className="setting_wrap">
        <div className="setting_header">
          <span className="iconfont icon-xiangzuo1" onClick={this.goBack}></span>
          <p>设置</p>
        </div>
        <ul className="setting_body">
          <li className="setting_icon">
            <p>我的头像</p>
            <p>
              <img src={require('../../static/image/3.jpg')} alt="" />
              <span className="iconfont icon-xiangyou"></span>
            </p>
          </li>
          <li className="setting_name">
            <p>用户名</p>
            <p><b>123456789</b><span className="iconfont icon-xiangyou"></span></p>
          </li>
          <li>
            <p>我的二维码名片</p>
            <p><b className="iconfont icon-qr-code"></b><span className="iconfont icon-xiangyou"></span></p>
          </li>
          <li>
            <p>绑定手机号</p>
           <span className="iconfont icon-xiangyou"></span>
          </li>
        </ul>
        <button onClick={this.loginOut} className="login_out">退出登录</button>
      </div>
    )
  }
  // 点击退出登录，执行utils里的方法，使token字段失效
  loginOut() {
    loginOut()
    this.props.history.push('/index/home')
  }
  goBack(){
    this.props.history.go(-1)
  }
}

export default Setting