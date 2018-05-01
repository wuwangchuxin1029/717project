export default function mapStateToProps(state) {
  // console.log(state,'1111')
  // 遍历购物车列表，计算总价
  let totalCost = 0
  let selectedAll = true //默认全选
  state.shopcart.forEach((item,index) => {
    if(item.select == 1){
      totalCost += (item.discount_price*item.count)
    }
    // 默认为全选状态，只要有一个未选中，全选按钮改为不全选状态
    if(item.select == 0){
      selectedAll = false
    }
  })
  return {
    cartList:state.shopcart,
    totalCost,
    selectedAll
  }
}