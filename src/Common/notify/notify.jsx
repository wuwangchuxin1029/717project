import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// loading
export class Loading extends Component {
  constructor() {
    super()
    this.contentStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      background: 'rgba(0,0,0,.8)',
    }
  }
  
  render() {
    return (
      // <div className="notify" style={}>
      <div style={this.contentStyle}>loading......</div>
      //  </div>
    )
  }
}

// 提示条
export class Notify extends Component {
  constructor() {
    super()

    this.notifyStyle = {
      color: '#FFF'
    }
    this.contentStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%,-50%,0)',
      width: '50%',
      textAlign: 'center',
      border: '.01rem solid #ccc',
      borderRadius: '.5rem',
      background: 'rgba(0,0,0,.8)',
      color: '#FFF',
      padding: '.1rem'
    }
  }

  render() {
    const { msg } = this.props
    return (
      // <div className="notify" style={}>
      <div style={this.contentStyle}>{msg}</div>
      // </div>
    )
  }
  //因为组件调用的是NotifyPortals,所以即使它不渲染内容也是一直存在的，所以只有卸载它所渲染的Notify组件才能执行
  componentWillUnmount() {
    console.log('将要删除notify')
  }
}

// portal 是react-dom提供的一个方法，它接收两个参数，
//一个是子组件或dom元素（A），一个是A要放入的容器元素节点(B)
class NotifyPortals extends Component {
  constructor() {
    super()
    this.state = {
      isMounted: false,   // 是否渲染Notify组件
      renderDom: document.body,  // 默认的容器(B)
      msg: 'message......'
    }
    document.body.style.cssText = 'position:relative'
    this.mountNotify = this.mountNotify.bind(this)
  }
 
  render() {
    const { type } = this.props
    let { isMounted, renderDom, msg } = this.state
    // 根据调用组件传来的type属性判断渲染loading还是notify
    return isMounted ? ReactDOM.createPortal(type == 'loading' ? <Loading /> : <Notify msg={msg} />, renderDom) : ''
  }

  componentDidMount() {
    let { container } = this.props //容器组件传递的dom节点
    // console.log(container, 'cccccc')
    if (typeof container == 'string') {
      let node = document.querySelector(container)
      node.style.cssText = 'position:relative'
      this.setState({
        renderDom: node
      })
      // console.log(node, 'ddddd')
    } else {
      console.log('container目前只支持string格式')
    }
  }

  // 控制组件的显示与隐藏
  mountNotify(msg) {
    this.setState({
      isMounted: true,
      msg
    })
    if (!this.props.type == 'loading') {
      setTimeout(() => {
        this.setState({
          isMounted: false
        })
      }, 1000
      )
    }
  }

  // 控制loading组件的显示与隐藏
  unMountNotify(){
    this.setState({
      isMounted:false
    })
  }
}
export default NotifyPortals