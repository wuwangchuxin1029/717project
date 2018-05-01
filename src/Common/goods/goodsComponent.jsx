import React, { Component } from 'react'
import Lazyload from 'react-lazyload'
import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import { connect } from 'react-redux'
import { getCart } from '../../store/actions/shopcart'
import './goodsComponent.scss'

// loading图片
// class Placeholder extends Component{
//   render () {
//     return <img src={require('../../static/image/loading.jpg')} alt=""/>
//   }
// }

class GoodsComponent extends Component {
  constructor() {
    super()
    this.addCart = this.addCart.bind(this)
  }
  render() {
    const { data } = this.props
    return (
      <div className="goods_item_wrap">
        <dl className="goods_item" onClick={() => { this.toDetail(data.goods_id) }}>
          <dt>
            {/* <Lazyload>
                height={'100%'}
                overflow
                once 
                debounce={100}
                placeholder={<Placeholder/>}
                <img src={'http://www.lb717.com'+data.obj_data} alt=""/>
              </Lazyload>    */}
            <img src={'http://www.lb717.com' + data.obj_data} alt="" />
          </dt>
          <dd>
            <p className="item_text">{data.goods_name}</p>
            <p className="goods_info">
              <b>￥ {data.discount_price}</b>
              <span className="cart iconfont icon-gouwuche" onClick={this.addCart}></span>
            </p>
          </dd>
        </dl>
      </div>
    )
  }
  // 点击商品跳转详情页
  toDetail(goods_id) {
    // 通过传参的方式将商品id传递过去（地址栏参数拼接的方法或是传递一个对象的方法）
    this.props.history.push('/detail?goods_id=' + goods_id)
    // this.props.history.push('/detail',{
    //   goods_id:goods_id
    // })

  }
  // 点击购物车添加商品到购物车（需要判断是否登录，才能添加）
  addCart(e) {
    e.stopPropagation()
    const { dispatch, data } = this.props  
    // 添加购物车时需要向后台发送发送token字段，
    //来判断用户是否登录,如果没有登录则跳转到登录页登录后才能添加到购物车
    if (getCookie('token')) {
      $http.post('/user/Cart/addCart', {
        goods_id: data.goods_id, //发送商品ID
        goods_info: data,
        token: getCookie('token')
      })
        .then((res) => {
          // 返回1说明添加购物车成功，此时可以弹出一个添加成功的提示条
          console.log(res)
          if(res == 1){
            mountNotify('商品添加成功')
          //  如果添加购物车成功，则通过connect将添加的商品存入store中
            dispatch(getCart(data))
          }
        })
    }else{
      // from字段的作用：存储在location中，可以识别是从哪个页面跳转到login页的，然后登录后再次回到from的页面
      this.props.history.push('/login',{
        from:this.props.location.pathname
      })
    }

  }
}

export default connect()(GoodsComponent)