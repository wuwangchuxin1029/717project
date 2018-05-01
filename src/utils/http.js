
/**
 * 根据process.env的不同来设置不同的服务器的域名
 * 再根据不同服务器的域名，去请求不同的数据，测试环境下请求静态服务器的数据
 * 上线后请求真实服务器的数据
 */

// 定义一个协议与域名的变量，在发送数据请求的时候，与url拼接在一起传递给后台
let domin  
//  本地测试服务器的域名，
if(process.env == 'development'){
  domin = 'http://localhost:9900'
}
// 上线后的服务器域名
if(process.env == 'production'){
  domin = 'http://www.lb717.com'
}

let $http = {
    get(url,data){
      // get方式传参=>直接写在url后面 ：url?xx=xx&zz=zz,此处需要处理参数的格式
      /**
       * 判断参数的数据类型
       * 1.不是对象的话向返回错误信息，并退出（return）
       * 2.是对象的话，遍历对象并将key与value拼接成string格式，并将参数进行编码，避免中文出现乱码现象
       * 
       */
      if(Object.prototype.toString.call(data) != "[object Object]"){
        return {
          // 此处的then是发送数据请求时，返回的then方法，它接收的是一个回调函数，
          // 请求正确时，这个callback会打印出请求的数据，错误时则反馈如下信息
          then(callback){
            callback("get请求入参格式不正确，需要传递Object")
            return {
              catch(err){
                err( new Error('入参格式错误'))
              }
            }
          }
        }
      }
      let queryString="?"
      for(let key in data){
        queryString+=(key+'='+data[key]+'&')
      }
      // url与参数拼接，并去掉最后多出来的一个“ & ”
      url=encodeURI(url+queryString.slice(0,-1))

      return fetch(domin+url,{
        // 设置请求头信息
        headers:{
          "Content-Type":"application/json;charset-utf-8"
        }
      }).then(res => res.json())
    },

    post(url,data){
      if(Object.prototype.toString.call(data) != "[object Object]"){
        return {
          // 此处的then是发送数据请求时，返回的then方法，它接收的是一个回调函数，
          // 请求正确时，这个callback会打印出请求的数据，错误时则反馈如下信息
          then(callback){
            callback("get请求入参格式不正确，需要传递Object")
            return {
              catch(err){
                err( new Error('入参格式错误'))
              }
            }
          }
        }
      }
      return fetch(domin+url,{
        body:JSON.stringify(data), // post方式的参数是放在body字段中的，必须是string格式
        headers:{
          "Content-Type":"application/json;charset=utf-8",
          "Token":"00000"
        },
        method:"POST"
      }).then(res => res.json())
    }
}

export default $http