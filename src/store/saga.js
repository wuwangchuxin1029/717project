// 中间件：在action到rediucer之间添加一些逻辑，监听action 并触发新的action
// import { takeEvery, takeLatest } from 'redux-saga'
// import { call, put } from 'redux-saga/effects'
// import { $http, getCookie } from '../utils/utils'
// import { getAddList } from '../store/actions/address'


// call:发起数据请求， put:派发action,将请求到的数据存到store

// function* fetchData() {
//   try {
//     let res = yield call($http.post, '/user/Mail/addList', { token: getCookie('token') })
//     yield put(getAddList(res))
//   }
//   catch (err) {
//     yield put(getAddList(res))
//   }
// }

// function* watchAddress(){
//   yield takeEvery(['GET_ADDRESS_LIST'],fetchData)
// }

// yield是按顺序执行的，必须要先执行完上一个才能继续执行下一个。
// 为解决这个问题，可以将要执行的函数放在一个数组中
// export default function* rootSaga(){
//   yield [waftchAddress()]
// }