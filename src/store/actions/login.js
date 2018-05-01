import * as types from '../actionTypes'

export const getUserinfo = (userInfo) => {
  return {
    type: types.USER_INFO,
    data:userInfo
  }
}