const jwt = require('jsonwebtoken')  // 引入第三方包来加密，用于网站的安全与一些权限管理
const querystring = require('querystring') //引入node内置模块
const fs = require('fs')
const http = require('http') // 引入node内置模块
const _ = require('lodash') // 引入第三方工具库（操作数组）

// 封装http.request请求远端数据的方法
function queryApi(url, methods, params) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.lb717.com',
      port: 80,
      path: url,
      method: methods,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }

    let data = '';
    // 在客户端的数据请求接口中使用http.request向远端发起数据请求，并将请求到的数据返回给客户端
    let request = http.request(options, (response) => {
      response.setEncoding('utf8')
      response.on('data', (chunk) => {
        // console.log(chunk,'CHUNKKKKK')
        data += chunk;
      })
      response.on('end', () => {
        // console.log(data,'datata')
        // 在结束远端数据请求时，将请求到的数据返回给客户端
        resolve(JSON.stringify(data))
      })
    })
    if (methods.toLowerCase() == 'post') {
      request.write(querystring.stringify(params))
    }
    request.end()
  })
}

module.exports = function (app) {

  // 商品列表的接口
  // http.request远端请求的参数对象
  app.post('/mall/index/getGoodsChannel', function (req, res) {
    // console.log(req.body,)
    // 调用http.request方法
    queryApi('/mall/index/getGoodsChannel', 'post', req.body)
      .then((data) => {
        res.end(data)
      })
  })



  // 模拟数据库
  /**
   *  后台接收到客户端发来的注册信息，并将其存入指定的数据库，然后返回给客户端一个
   * 注成功的信息。 此处使用node的fs内置模块模拟数据库user.json，通过接口读取（fs.readFile）前端的信息
   * 并将其存入(fs.write)数据库（user.json）,成功后返回给前端一个注册成功的信息
   */
  // 注册接口
  app.post('/user/register', function (req, res) {
    console.log(req.body, '0001')

    // 读取数据
    let user = fs.readFileSync('user.json', { encoding: 'utf-8' })
    user = JSON.parse(user)  // 将字符串格式转为对象
    user.push(req.body)   // 把前端发送的信息push到user.json的空数组中
    console.log(user)
    // 接收数据《也就是写入文件》(参数：文件路径，要写入的内容 ，成功的回调函数)
    fs.writeFile('user.json', JSON.stringify(user), function () {
      // 成功接收文件后
      //向客户端返回成功的信息
      res.end(JSON.stringify({
        "success": 1,
        "info": 'register success'
      }))
    })
  })


  /**
   *  token字段是一个加密的字段也就是密钥，以保证网站用户信息安全。使用第三方包jsonwebtoken来生成密钥和解密
   */
  // 登录接口
  app.post('/user/login', function (req, res) {
    // 读取注册信息数据库的内容
    let user = fs.readFileSync('user.json', { encoding: "utf-8" })
    user = JSON.parse(user)
    // 将前端发的信息存入login变量中
    let login = req.body
    // 遍历注册数据库中的数据，并与客户端传来的信息对比
    let resInfo = {  // 默认的返回信息
      success: 0,
      info: "用户名或密码错误",
      token: ''
    }
    user.forEach(userItem => {
      if (userItem.username == login.username && userItem.password == login.password) {
        // 匹配成功返回成功信息
        resInfo.success = 1,
          resInfo.info = "login success",
          resInfo.user = {
            name: userItem.username,
            time: new Date().toLocaleTimeString(),
            nickname: 'balabala'
          }
      }
    })
    // 生成token密钥(jwt.sign接收三个参数，第一个：，第二个：密钥名称，第三个：设定超时时间（秒）)
    if (resInfo.success == 1) {
      resInfo.token = jwt.sign(login, '717project', {
        expiresIn: 60 * 60 * 24
      })
    }
    //向客户端返回数据匹配后的结果
    res.end(JSON.stringify(resInfo))
  })


  // 添加购物车
  app.post('/user/Cart/addCart', function (req, res) {
    // console.log(req.body,'cart')
    // 对前端传递过来的token进行解码
    jwt.verify(req.body.token, '717project', (err, decoded) => {
      // 如果解码错误，向客户端返回一个解码错误的信息
      if (err) {
        res.end(JSON.stringify({
          info: "登录失败"
        }))
      } else {
        // 解码成功的话，将商品信息追加到用户信息里面
        // 将添加到购物车的数据进行去重操作，便于前台操作
        let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/shopCart.json', { encoding: 'utf-8' }))
        if (cartInfo[decoded.username]) {
          let cartList = cartInfo[decoded.username]
          let flag = false // 默认商品未添加过
          cartList.map((item, index) => {
            if (item.goods_id == req.body.goods_info.goods_id) {
              ++item.count
              flag = true
            }
          })
          if (!flag) { // 已经添加过的商品，继续push
            let cart = req.body.goods_info
            cart.count = 1
            cart.select = 0
            cartInfo[decoded.username].push(cart)
          }
        } else {
          //给数据添加count和select字段
          let cart = req.body.goods_info
          cart.count = 1
          cart.select = 0
          cartInfo[decoded.username] = [cart]
        }
        fs.writeFile(__dirname + '/shopCart.json', JSON.stringify(cartInfo), function () {
          res.end("1")
        })
      }
    })

  })


  // 登录后的购物车列表数据接口
  app.post('/user/Cart/goodsList', (req, res) => {
    // 解密获取用户信息
    jwt.verify(req.body.token, '717project', (err, decoded) => {
      // 解密错误时给前端返回一个错误信息，前端根据错误信息来决定后续操作
      if (err) {
        res.end(JSON.stringify({
          info: "登录失败",
          error: 1
        }))
      } else {
        // 解密成功时，将用户添加到购物车的数据传给前端
        console.log(decoded)
        try {
          let carts = JSON.parse(fs.readFileSync('./shopcart.json', { encoding: "utf-8" }))
          res.json(carts[decoded.username])
        } catch (err) {
          res.json(err)
        }
      }
    })
  })

  // 删除购物车商品接口
  app.post('/user/Cart/deleteGoods', (req, res) => {
    // console.log(req.body)
    // 读取购物车数据
    let deleteList = JSON.parse(fs.readFileSync('shopCart.json', { encoding: "utf-8" }))
    // 解密用户信息
    jwt.verify(req.body.token, '717project', (err, decoded) => {
      if (err) {
        res.json(err)
      } else {
        let cartList = deleteList[decoded.username]
        // 删除符合条件的id，返回删除后的数据
        let delGoods = _.remove(cartList, (item) => {
          return req.body.selectedId.indexOf(item.goods_id) != -1
        })
        // console.log(delGoods,'xxxx')   删除的数据
        // console.log(cartList,'00000')  此时的cartList返回的是删除后剩下的数据
        deleteList[decoded.username] = cartList
        // console.log(deleteList,'2222') 将删除后的商品重新赋值给当前用户的数据，替换shopCart.json
        fs.writeFile(__dirname + '/shopCart.json', JSON.stringify(deleteList), function () {
          res.json({
            success: 1,
            info: '删除成功',
            deleteGoods: delGoods,   // 删除的
            surplusGoods: cartList   // 删除后剩余的
          })
        })
      }
    })
    // res.json(1)
  })

  // 新增收货地址接口
  app.post('/user/Mail/addAddress', (req, res) => {
    // console.log(req.body)
    // 解密token字段，如果用户未登录，返回错误，
    //登录状态时将前端传递的用户信息加入收货地址数据中（address.json）
    jwt.verify(req.body.token, '717project', (err, decoded) => {
      if (err) {
        res.json(err)
      } else {
        let us = decoded.username
        let address = JSON.parse(fs.readFileSync('./address.json', { encoding: 'utf-8' }))
        if (address[us]) {
          address[us].push(req.body)
        } else {
          delete req.body.token
          address[us] = [req.body]
        }
        fs.writeFile('./address.json', JSON.stringify(address), (err) => {
          if (err) {
            res.json(err)
          } else {
            res.json({
              success: 1,
              info: '添加成功'
            })
          }
        })
      }
    })
  })

  // 获取收货地址列表
  app.post('/user/Mail/addList', (req, res) => {
    jwt.verify(req.body.token, '717project', (err, decoded) => {
      if (err) {
        res.json(err)
      } else {
        let addList = fs.readFileSync('./address.json', { encoding: 'utf-8' })
        res.json(addList)
      }
    })
  })
}