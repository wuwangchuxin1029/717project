import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import routerMap from './router/router.config'
import Routes from './Common/routes'
import { Provider } from 'react-redux'
import store from './store'

// import './static/fontSet/fontSet'
import './static/717font/iconfont.css'
import './static/css/reset.css'
import './main.css'

console.log(process.env)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Redirect exact from='/' to='/index/home'></Redirect>
        <Routes routerInfo={routerMap.routerInfo}/>
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root')
)