import Index from '../components/indexs'
import Home from '../components/home'
import Catagory from '../components/catagory'
import Detail from '../components/detail'
import Shopcart from '../components/shopcart'
import Mine from '../components/mine'
import Search from '../components/search'
import Login from '../components/login'
import Register from '../components/register'
import Result from '../components/result'
import NoMatch from '../components/router404'
import Setting from '../components/setting'
import Address from '../components/address'
import Receiver from '../components/receiver'


let rouerMap = {
    routerInfo:[
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'/index/home',
                    component:Home,
                },
                {
                    path:'/index/catagory',
                    component:Catagory,
                },
                {
                    path:'/index/shopcart',
                    component:Shopcart,
                },
                {
                    path:'/index/mine',
                    component:Mine,
                    authorization:true
                },
                {
                    path:'/index/result',
                    component:Result,
                },
                {
                    path:'/index/search',
                    component:Search,
                }
            ]
        },
        {
            path:'/detail',
            component:Detail,
        },
        {
            path:'/login',
            component:Login,
        },
        {
            path:'/register',
            component:Register,
        },
        {
            path:'/setting',
            component:Setting,
        },
        {
            path:'/address',
            component:Address,
        },
        {
            path:'/receiver',
            component:Receiver,
        }
    ]
}
export default rouerMap

