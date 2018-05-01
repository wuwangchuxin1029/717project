import * as types from '../actionTypes'

const initState = {
  userInfo:null
}
const login = (state = initState,action) => {
  switch(action.type){
    case types.USER_INFO:
      return action.data
    default :
      return state
  }
}
export default login