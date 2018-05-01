import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getCookie } from '../../utils/utils'

function isLogin() {
  return !!getCookie('token')
  // 根据token字段判断是否登录
  // if(!getCookie('token')){
  //   return false
  // }else{
  //   return true
  // }
}
class Routes extends Component{
  render () {
    const { routerInfo } = this.props
    return (
      routerInfo.map((item,index) => {
        return (
          <Route 
            key={index}
            exact={item.exact}
            path={item.path} 
            render={(location)=> {
              // console.log(item)
              // 如果设置了路由权限，并且是在非登录状态下，则跳转到登录页面，登录后再返回到当前页面
                return item.authorization && !isLogin()
                ?<Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>
                :<item.component {...location} routerInfo={item.children}></item.component>
            //  return <item.component {...location} routerInfo={item.children}></item.component>
            }}
          >
          </Route>
        )
      })
    )
  }
}

export default Routes