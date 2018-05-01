import React, { Component } from 'react'
import { connect } from 'react-redux'
import './mine.scss'

class Mine extends Component {
  constructor() {
    super()
    this.toSetting = this.toSetting.bind(this)
    this.toAddress = this.toAddress.bind(this)
  }
  render() {
    const { userInfo } =this.props
    console.log(userInfo,'ppppppp')
    return (
      <div className="mine_wrap">
        <header className="mine_header">
          <span className="iconfont icon-shezhi" onClick={this.toSetting}></span>
          <p>我的717商城</p>
        </header>
        <section className="mine_section">
          <div className="mine_favicon">
            <p className="iconfont icon-unie64d"></p>
            <p>{userInfo.name}</p>
            <p>{userInfo.nickname}</p>
          </div>
          <div className="mine_store">
            <p>
              <span className="iconfont icon-msnui-dianpu"></span>
              <span>我的店铺</span>
            </p>
            <span className="iconfont icon-gengduo2"></span>
          </div>
          <div className="mine_catagory">
            <dl>
              <dt className="iconfont icon-daifukuan1"></dt>
              <dd>待付款</dd>
            </dl>
            <dl>
              <dt className="iconfont icon-daifahuo"></dt>
              <dd>待发货</dd>
            </dl>
            <dl>
              <dt className="iconfont icon-dengdaishouhuo"></dt>
              <dd>待收货</dd>
            </dl>
            <dl className="last_icon">
              <dt className="iconfont icon-tuikuanshouhou"></dt>
              <dd>售后</dd>
            </dl>
            <dl>
              <dt className="iconfont icon-gerenzhongxinwodedingdan"></dt>
              <dd>我的订单</dd>
            </dl>
          </div>
          <ul className="mine_list">
            <li>
              <dl>
                <dt className="iconfont icon-shequfuwuzhan"></dt>
                <dd>我的社区</dd>
              </dl>
              <span className="iconfont icon-gengduo2"></span>
            </li>
            <li>
              <dl>
                <dt className="iconfont icon-yly_zhanghuyue"></dt>
                <dd>账户余额</dd>
              </dl>
              <span className="iconfont icon-gengduo2"></span>
            </li>
            <li onClick={this.toAddress}>
              <dl>
                <dt className="iconfont icon-ziyuan"></dt>
                <dd>地址管理</dd>
              </dl>
              <span className="iconfont icon-gengduo2"></span>
            </li>
          </ul>
          <div className="mine_hot">
            <div className="hot_title">
                <span></span><p>热门推荐</p><span></span>
            </div>
          </div>
        </section>
      </div>
    )
  }
  toSetting() {
    this.props.history.push('/setting')
  }
  toAddress(){
    this.props.history.push('/address')
  }
}
const mapStateToProps =(state) => {
  let userInfo = null
  console.log(state.login.name,'ssss')
  console.log(localStorage.getItem('userInfo'),'LLLLL')
  if(!state.login || !state.login.name){
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }else{
    userInfo = state.login
  }
  return {
    userInfo
  }
}
export default connect(mapStateToProps)(Mine)