import * as types from '../actionTypes'

export const updateList = (data) => {
    return{
      type: types.UPDATE_GOODS_LIST,
      data:data
    }
}