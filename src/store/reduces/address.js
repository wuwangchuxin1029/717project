import * as types from '../actionTypes'

const initState = {
  addList:[]
}

const address = (state = initState,action) => {
    switch(action.type){
      case types.SAVE_ADDRESS:
      return action.addList
    }
}