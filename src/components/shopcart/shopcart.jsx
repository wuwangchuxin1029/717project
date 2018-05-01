import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from '../../components/cartItem'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import './shopcart.scss'


class Shopcart extends Component {
  constructor() {
    super()
    this.state = {
      str: 'all',
      text:'编辑',
      compute:'结算'
    }
    this.cartEdit = this.cartEdit.bind(this)
    this.toDelete = this.toDelete.bind(this)
  }
  render() {
    const { str, text, compute} = this.state
    const { cartList, totalCost, selectedAll, checkedAll } = this.props
    return (
      <div className="cart_wrap">
        <div className="cart_title">
          <h4>购物车</h4><span onClick={this.cartEdit}>{text}</span>
        </div>
        <div className="cart_list_wrap">
          {
            cartList.map((item, index) => {
              return (
                // 调用购物车列表组件，并且把connect中的updateCount方法也传递过去
                <CartItem key={index} item={item}></CartItem>
              )
            })
          }
        </div>
        <div className="cart_foot">
          <dl className="cart-btn">
            <dt
              className={"checked" + (selectedAll ? ' iconfont icon-duihao' : '')}
              onClick={() => {
                this.setState({
                  str:str == 'all' ?'none':'all'
                })
                checkedAll(str)
              }
              }>
            </dt>
            <dd>全选</dd>
          </dl>
          <dl className="cart_sum"><dt>合计：</dt><dd>￥{totalCost}</dd></dl>
          <button onClick={this.toDelete}>{compute}</button>
        </div>
      </div>
    )
  }
  // 点击切换购物车状态
cartEdit(){
  const { text } = this.state
  this.setState({
    text: text =='编辑'? '完成':'编辑',
    compute: text =='编辑'? '删除':'结算'
  })
}

// 点击删除商品
toDelete(){
  if(this.state.compute == '结算') return
  const { cartList } = this.props
  let selectedId = []
  cartList.map((item,index) => {
     if(item.select == 1){
      selectedId.push(item.goods_id)
    }
  })
  //挂载dispatch中的方法，并将收集到的商品id传入
  this.props.deleteCart(selectedId)
}
  componentDidMount() {
    const { history } = this.props
    this.props.getCartList(history) //挂载dispatch中的方法，获取购物车中原有的数据
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shopcart)