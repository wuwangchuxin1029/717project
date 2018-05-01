import * as types from '../actionTypes'

let initState = {
  name: 'shopcart',
  cart_list: []
}
const shopcart = (state = initState.cart_list, action) => {
  switch (action.type) {
    // 添加商品到购物车
    case types.ADD_CART:
      let flag = false // 表示购物车中没有此商品
      // 遍历state,如果添加的商品id与购物车中的商品id相同则累加数量，不用将商品明细再次加入数据中
      state.forEach((item, index) => {
        if (item.goods_id == action.cart_list.goods_id) {
          ++item.count
          flag = true  //此时购物车中已添加了此商品
        }
      })
      // 如果是true,返回本身，只改变它的数量，false的话，向列表中添加商品
      return flag ? [...state] : [...state, action.cart_list]
      break;
    // 点击加减时更新商品数量
    case types.UPDATE_GOODS_COUNT:
      let arr = [...state]
      arr.forEach((list) => {
        if (list.goods_id == action.id) {
          list.count = action.data
        }
      })
      return arr
      break;
    // 更新商品是否选中的状态
    case types.UPDATE_GOODS_SELECTED:
      let add = [...state]
      add.forEach((list) => {
        if (list.goods_id == action.id) {
          list.select = action.data
        }
      })
      return add
      break;
    // 更新购物车列表数据
    case types.UPDATE_GOODS_LIST:
      return action.data
      break;

    // 设置是否全选(将每一项的select字段改为1)
    case types.SELECTED_ALL:
      let add2 = [...state]
      add2.forEach((list) => {
          list.select = action.data == 'all'? 1:0      
      })
      return add2
      break;
    default: return state
  }
  return state
}
export default shopcart