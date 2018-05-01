import * as types from '../actionTypes'

// 添加到购物车
export const getCart = (cart_list) => {
  return {
    type:types.ADD_CART,
    // 在数据中添加一个count字段，作为购物车商品数量的初始值
    // select字段：表示商品是否选中，默认都为未选中状态
    cart_list:{...cart_list,count:1,select:0}
  }
}