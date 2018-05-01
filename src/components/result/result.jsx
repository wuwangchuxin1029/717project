import React,{ Component } from 'react'
import './result.scss'

class Result extends Component{
  render () {
    const { loaction } = this.props
    console.log(this.props,'result  ')
    return (
      <div className="result_wrap">
        <header className="result_header">
          <span className="iconfont icon-xiangzuo2"></span>
           <div className="search_wrap">
              <span className="search_icon iconfont icon-sousuo1"></span>
              <input type="text" placeholder="请输入您要购买的商品" ref='search'/>
            </div>
        </header>
        <section>
          <ul className="result_tab">
            <li>综合</li>
            <li>销量</li>
            <li>价格</li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Result