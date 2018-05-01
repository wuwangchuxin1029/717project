import React,{ Component } from 'react'
import $http from '../../utils/http'
import SwiperComponent from '../../Common/swiper'
import GoodsComponent from '../../Common/goods'
import Notify from '../../Common/notify'
import './home.scss'

class Home extends Component{
  constructor (){
    super()
    this.state = {
      goodsList:[],
      channel_id:1,
      flag:true,  // 设置一个状态，来控制滚动时的数据请求，提高性能
      display:'off'
    }
    this.toSearch = this.toSearch.bind(this)
    this.scrollChange = this.scrollChange.bind(this)
  }
  render () {
    const { goodsList } = this.state
    return (
      <div className="home_wrap" ref="doc">
        {/* 头部 */}
          <header className="home_header">
            <img src={require('../../static/image/home_logo.png')} alt=""/>
            <div className="header_inp">
              <span className="search_icon iconfont icon-sousuo1"></span>
              <input type="text" placeholder="请输入您要购买的商品" onFocus={this.toSearch}/>
            </div>
            <div className="header_icons">
              <span className="iconfont icon-shop"></span>
              <p>我的店铺</p>
            </div>
          </header>
          <section onScroll={this.scrollChange} ref='scroll_wrap'>
            <div ref="document_wrap">
                {/* 轮播图组件 */}
                <SwiperComponent></SwiperComponent>
                <div className="home_goods_list">
                  <div className="goods_catagroy">
                      <dl>
                        <dt><img src={require('../../static/image/1.jpg')} alt=""/></dt>
                        <dd>家乡味道</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/2.jpg')} alt=""/></dt>
                        <dd>进口食品</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/3.jpg')} alt=""/></dt>
                        <dd>牛奶乳品</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/4.jpg')} alt=""/></dt>
                        <dd>茶果冲饮</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/4.jpg')} alt=""/></dt>
                        <dd>休闲零食</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/3.jpg')} alt=""/></dt>
                        <dd>米面粮油</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/2.jpg')} alt=""/></dt>
                        <dd>调味调料</dd>
                      </dl>
                      <dl>
                        <dt><img src={require('../../static/image/1.jpg')} alt=""/></dt>
                        <dd>酒水饮料</dd>
                      </dl>
                  </div>
                  <div className="bottom_title">
                    <p className="title_p">商城动态</p>
                    <p className="title_text">绿色无公害 无污染 无添加 天然有机蔬菜源头 吃的放心，健康第一，安全保证，确保蔬菜新鲜。</p>
                  </div>
                </div>
                {/* 更多 */}
                <div className="home_more">
                  <div className="home_more_left">
                    <span className="iconfont icon-wodedingdan1"></span>
                    <b>天天特惠</b>
                    <small>每天有惊喜</small>
                  </div>
                  <p>更多<span className="iconfont icon-gengduo2 icons"></span></p>
                </div>
                {/* 专场 */}
                <div className="home_special">
                    <div className="home_special_left">
                        <img src={require('../../static/image/special.jpg')} alt=""/>
                    </div>
                    <div className="home_special_right">
                      <p><img src={require('../../static/image/3.jpg')} alt=""/></p>
                      <p><img src={require('../../static/image/4.jpg')} alt=""/></p>
                    </div>
                </div>               
                <div className="goods_list">
                  <div className="goods_list_title">
                    <div className="title_left">
                      <b className="title_line"></b>
                      <span className="iconfont icon-find-fav"></span>
                      <b>家乡味道</b>
                      <b className="title_line"></b>
                    </div>
                    <div className="title_more">
                      <p className="title_more_p">更多<span className="iconfont icon-gengduo2"></span></p>
                    </div>
                  </div>
                  <div className="goods_wrap">
                    {
                      goodsList.map((item,index) => {
                        return <GoodsComponent key={index} data={item} history={this.props.history} location={this.props.location}/>
                      })
                    }
                  </div>,
                  <div className={this.state.display+' bottom_info'}>我是有底线的...</div>
                </div> 
            </div>
          </section>
          <Notify ref='notify' container={".index_content"}/>
      </div>
    )
  }
  toSearch () {
    console.log(this.props)
    this.props.history.push('/index/search')
  }
  componentDidMount(){
    // 在Notify的实例上定义一个函数，通过调用这个函数来使用Notify提示条
    window.mountNotify = this.refs.notify.mountNotify
    console.log(window.mountNotify)
    // 发起数据请求
    $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
    .then(res => {
        // console.log(JSON.parse(res))
        this.setState({
          goodsList:JSON.parse(res).data.data
        })
    })
  }
  scrollChange () {
    // 如果flag状态为false,退出操作，不请求数据
    if(!this.state.flag) return
    let { scroll_wrap, document_wrap } =this.refs
    let sT = scroll_wrap.scrollTop      // 滚动高度
    let sH = scroll_wrap.offsetHeight   // 视窗高度
    let dH = document_wrap.offsetHeight  //文档高度
    // console.log((dH-sH),'st '+sT,sT+15)
    // 当滚动到接近文档底部的时候，将flag状态设置为false，继续发起数据请求
    if(dH - (sT+sH) < 50){
      this.setState({
        channel_id:++this.state.channel_id,
        flag:false
      })
      // console.log('可以请求数据')
      $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
      .then(res => {
        // console.log(JSON.parse(res).data.data)
          this.setState({
            goodsList:[...this.state.goodsList,...JSON.parse(res).data.data],
            // 当数据更新完成后再次将flag状态设为true，这样避免了每次滚动都会不停的请求数据，减轻浏览器压力
            flag:true
          })
      })
    }
    // 文档高度-滚动区高度=滚动条高度时，改变display的值
    if((dH-sH) <= sT+10){
      this.setState({
        display:'on'
      })
    }
  }
}

export default Home