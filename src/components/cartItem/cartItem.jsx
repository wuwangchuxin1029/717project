import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as types from "../../store/actionTypes"
import './cartItem.scss'

class CartItem extends Component {
  render() {
    const { item, updateCount, toggleSelect } = this.props
    return (
      <div className="cart_list">
        {/* 根据数据中的select字段判断是否是选中状态 */}
        <span
          className={"checked iconfont " + (item.select == 0 ? '' : 'icon-duihao')}
          onClick={() => { toggleSelect((1 - item.select), item.goods_id) }}
        >
        </span>
        <img src={'http://www.lb717.com/' + item.obj_data} alt="" />
        <div className="cart_text">
          <p>{item.goods_name}</p>
          <span>x{item.count}</span>
          <h5>￥{item.discount_price}</h5>
        </div>
        <div className="cart_change">
          <span className="sub"
            onClick={() => { updateCount(--item.count, item.goods_id) }}
          >-</span>
          <span className="count">{item.count}</span>
          <span className="add"
            onClick={() => { updateCount(++item.count, item.goods_id) }}
          >+</span>
        </div>
      </div>
    )
  }
  // toggleSelect:点击切换是否选中，根据数据中的select字段来切换

}
const mapDispatchToProps = (dispatch) => {
  return {
    updateCount(count,id){
      dispatch({
        type: types.UPDATE_GOODS_COUNT,
        data:count,
        id:id
      })
    },
    toggleSelect(select,id){
      dispatch({
        type:types.UPDATE_GOODS_SELECTED,
        data:select,
        id:id
      })
    }
  }
}
export default connect(null, mapDispatchToProps,null,{pure:false})(CartItem)
