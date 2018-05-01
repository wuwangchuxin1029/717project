import React,{ Component } from 'react'
// import './catagory.css'

class Catagory extends Component{
  render () {
    return (
      <div className="catagory_wrap">
        <header>
          <span className="iconfont icon-sousuo1"></span>
          <input type="text" placeholder="请输入您要搜索的商品"/>
        </header>
        <section className="catagory_body">

        </section>
      </div>
    )
  }
}

export default Catagory