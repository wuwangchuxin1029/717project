import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import { updateList } from '../../store/actions/goodsList'
import { SELECTED_ALL ,UPDATE_GOODS_LIST} from '../../store/actionTypes'

 const mapDispatchToProps = (dispatch) => {
  return {
    // 向后台请求购物车列表数据，后台根据token字段解密并获取购物车数据
    getCartList(history){
      $http.post('/user/Cart/goodsList',{
        token: getCookie('token')
      })
      .then(res => {
        // 如果后台返回的错误信息是1，则跳转到登录页
        if(res.error == 1){
          history.push('/login',{from:'/index/shopcart'})
        }else{
          // 后台返回正常时触发action，更新store
          dispatch(updateList(res))
        }
      })
    },
    // 更新全选状态
    checkedAll(str){
      dispatch({
        type:SELECTED_ALL,
        data:str
      })
    },
    // 向后台发送选中商品的id，同时也需要区分用户信息（token）
    deleteCart(selectedId){
      $http.post('/user/Cart/deleteGoods',{
        selectedId,
        token:getCookie('token')
      })
      .then(res => {
        dispatch(updateList(res.surplusGoods))
      })
    }
  }
}
export default mapDispatchToProps