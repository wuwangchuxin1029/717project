import React, { Component } from 'react'
import $http from '../../utils/http'
import { connect } from 'react-redux'
import { getUserinfo } from '../../store/actions/login'
import './login.scss'

class Login extends Component {
  constructor() {
    super()
    this.toLogin = this.toLogin.bind(this)
    this.toRegister = this.toRegister.bind(this)
  }
  // 点击登录
  toLogin() {
    const { dispatch } = this.props
    console.log(this.props)
    const { username, password } = this.refs
    $http.post('/user/login', {
      username: username.value,
      password: password.value
    })
      .then(res => {
        // 将token密钥存入cookie中
        if (res.success == 1) {
          // 将用户信息存储到store中(store是存在缓存中的，刷新就会没有了)
          dispatch(getUserinfo(res.user))
          // 将用户信息存储到localStorage中
          localStorage.setItem('userInfo',JSON.stringify(res.user))
          // 登录成功后要跳转的页面
          let from = this.props.location.state ? this.props.location.state.from || 'index/home' : 'index/home'
          document.cookie = 'token=' + res.token
          // 登录成功后跳转到首页
          this.props.history.replace(from)
        } else {
          alert('登录失败，请重新登录')
        }
      })
  }
  // 点击注册
  toRegister() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className="login_wrap">
        <ul>
          <li className="login_title">欢迎来到登录页面</li>
          <li><span>用户名</span><input type="text" ref="username" /></li>
          <li><span>密码</span><input type="password" ref="password" /></li>
          <li className="btn_wrap"><button onClick={this.toLogin}>登录</button><button onClick={this.toRegister}>注册</button></li>
        </ul>
      </div>
    )
  }
}

export default connect()(Login)