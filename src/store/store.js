import { createStore, applyMiddleware } from 'redux'
import reducer from './reduces'
import logger from 'redux-logger'
// import { createSagaMiddleware } from 'redux-saga'
// import sagas from './saga'

// let sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(
  logger
))

// sagaMiddleware.run(sagas)  //监听saga
export default store