import React,{ Component } from 'react'
import $http from '../../utils/http'
import { NavLink } from 'react-router-dom'
import Routes from '../../Common/routes'
import './indexs.css'


class Index extends Component{
  render() {
    const { routerInfo } = this.props
    return (
      <div className="index_wrap">
        <div className="index_content">
          <Routes routerInfo={routerInfo}></Routes>
        </div>
        <ul>
          <li>
            <NavLink to='/index/home' activeClassName="tab_active">
              <span className="iconfont icon-shouye"></span>
              <span>首页</span>
            </NavLink>  
           </li>
           <li>
             <NavLink to='/index/catagory' activeClassName="tab_active">
              <span className="iconfont icon-fenlei icons"></span>
              <span>分类</span>
            </NavLink>  
           </li>
           <li>
             <NavLink to='/index/shopcart' activeClassName="tab_active">
              <span className="iconfont icon-gouwuche"></span>
              <span>购物车</span>
            </NavLink>       
           </li>          
           <li>
             <NavLink to='/index/mine' activeClassName="tab_active">
              <span className="icon iconfont icon-wode"></span>
              <span>我的</span>
             </NavLink> 
           </li>          
        </ul>
      </div>
    )
  }
}
export default Index