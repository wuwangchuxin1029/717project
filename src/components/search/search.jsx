import React,{ Component } from 'react'
import './search.scss'

class Search extends Component{
  constructor () {
    super()
    this.state = {
      historyList:[],
      commonHistory:['粽子','锅巴','酱','小吃','零食','干果','特产','油','大米','面粉']
    }
    this.toResult = this.toResult.bind(this)
    this.toRemove = this.toRemove.bind(this)
  }
  render () {
    const { historyList, commonHistory } = this.state
    return (
      <div>
        <header className="search_header"> 
            <div className="search_inp">
              <span className="search_icon iconfont icon-sousuo1"></span>
              <input type="text" placeholder="请输入您要购买的商品" ref='search'/>
            </div>
            <span className="search_btn" onClick={this.toResult}>搜索</span>
        </header>
        <div className='history_wrap'>
          <div className="history_title">
            <p>最近搜素</p>
            <span className='iconfont icon-lajitong' onClick={this.toRemove}></span>
          </div>
          <div className="history_content">
              {
                historyList.length == 0 ? <p className='message'>暂无搜索记录</p>:
                historyList.map((item,index) => {
                  return <span key={index} onClick={() =>this.toResults(item)}>{item}</span>
                })
              }
          </div>
        </div>
        <div className="search_common_wrap">
          <p>大家都在搜</p>
          <div className='search_common'>
            {
              commonHistory.map((list,idx) => {
                return <span key={idx} onClick={() =>this.toResults(list)}>{list}</span>
              })
            }
          </div>
        </div>
      </div>
    )
  }
  // 点击搜索，跳转到搜索结果页
  toResult() {
    const { search } = this.refs
    let keyWords = search.value
    let storage = localStorage // 注意：loaclStorage只能存string数据格式
    if(!search.value) return
     
    // 判断是否有记录,有就先累加再set，没有就直接set
    if(storage.getItem("searchHistory")){
        let historyArr = JSON.parse(storage.getItem('searchHistory'))      
        if(historyArr.indexOf(keyWords) > -1) return 
          historyArr.push(keyWords)
          storage.setItem('searchHistory',JSON.stringify(historyArr))  
    }else{
      storage.setItem('searchHistory',JSON.stringify([keyWords]))
    }

   this.props.history.push('/index/result',{keyWords:search.value})    
  }
  // 点击关键词进入搜索结果页面
  toResults () {
    this.props.history.push('/index/result')
  }
  // 点击删除，清除搜索记录
  toRemove() {
    localStorage.removeItem('searchHistory')
    this.setState({
      historyList:[]
    })
  }
  componentDidMount() {
    let history =  localStorage.getItem('searchHistory')
    // 判断history数据是否存在，如果存在，将它转为对象赋给列表渲染
    if(history){
      this.setState({
        historyList:JSON.parse(history)
      })
    }
  }
}

export default Search