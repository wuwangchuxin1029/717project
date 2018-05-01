import React,{ Component } from 'react'
import $http from '../../utils/http'
import './register.scss'

class Register extends Component{
  constructor () {
    super ()
    this.toRegister = this.toRegister.bind(this)
  }
  //  点击注册
  toRegister(){
    // 通过ref获取dom
    let { username, password} = this.refs
    // 向后台发送数据,后台将数据存入指定的数据库，并返回一个注册成功的信息
    $http.post('/user/register',{
      username:username.value,
      password:password.value
    })
    .then(res => {
      // console.log(res,'525')
      if(res.success == 1){
        this.props.history.push('/login')
      }
    })
   
  }
  render () {
    return(
      <div className="login_wrap">
        <ul>
          <li>欢迎来到注册页面</li>
          <li><span>用户名</span><input type="text" ref="username"/></li>
          <li><span>密码</span><input type="password" ref="password"/></li>
          <li><button onClick={this.toRegister}>注册</button></li>
        </ul>
      </div>
    )
  }
}

export default Register