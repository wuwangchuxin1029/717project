import * as types from '../actionTypes'

export const getAddList = (data) => {
  return {
    type: types.SAVE_ADDRESS,
    addList:data
  }
}