import { combineReducers } from 'redux'
import shopcart from '../reduces/shopcart'
import login from '../reduces/login'
import address from '../reduces/address'

const rootReducer = combineReducers({
  shopcart,
  login,
  address
})

export default rootReducer