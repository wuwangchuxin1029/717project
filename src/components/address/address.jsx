import React, { Component } from 'react'
import Header from '../../Common/header'
import Button from '../../Common/button'
import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import Loading from '../../Common/notify'
import { connect } from 'react-redux'
import { getAddList } from '../../store/actions/address'
import './address.scss'

class Address extends Component {
  constructor() {
    super()
    this.toReceiver = this.toReceiver.bind(this)
  }
  render() {
    return (
      <div className="add_wrap">
        <Header history={this.props.history}>收货地址</Header>
        <Button className="add_btn" onClick={this.toReceiver}>
          <span className="iconfont icon-jia"></span>
          增加新地址
        </Button>
        <Loading container='.add_wrap' type='loading' ref="loading" />
      </div>
    )
  }
  // 点击新增地址，跳转页面添加收货地址
  toReceiver() {
    this.props.history.push('/receiver')
  }
  // 添加收货地址后，向后台请求地址信息，渲染页面
  // componentWillMount() {


  // }
  componentDidMount() {
    // 显示loading
    // const { loading } = this.refs
    // loading.mountNotify()
    // this.props.getAdd()    
  }
}
const mapStateToProps = (state) => {
  console.log(state, 'statetatetate')
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAdd() {
      $http.post('/user/Mail/addList', {
        token: getCookie('token')
      })
        .then(res => {
          console.log(res, 'lllllll')
          dispatch(getAddList(res))
          //不显示loading
          // this.refs.loading.unMountNotify()
        })
    }
  }
  // return {
  //   getAdd() {
  //     dispatch({
  //       type: 'GET_ADDRESS_LIST'
  //     })
  //   }
  // }
}
export default connect(mapStateToProps)(Address)