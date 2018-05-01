// 获取cookie
export function getCookie(name){
  // 获取所有的cookie
  let cookies = document.cookie;
  let cookiesArr
  let tempArr
  let result
  // cookies是string格式，先把它拆分成数据，然后遍历，获取value值
  if(cookies.length == 0)return
  if(cookies.indexOf(';') > -1){
    cookieArr = cookies.split(';')
    cookieArr.forEach((item,index) => {
        tempArr = item.split('=')
        if(tempArr[0] == name ){
          result = tempArr[1]
        }
    })
  }else{
    tempArr = cookies.split('=')
    if(tempArr[0] == name ){
          result = tempArr[1]
     }
  }
  return result
} 

// 退出登录的操作，使token字段失效
export  function loginOut(){
  let time = new Date() //获取当前的系统时间
  time.setTime(time.getTime()-1) // 当前时间的上一毫秒
// 添加一个expires字段，设置token的超时时间，UTC是国际时间，更为准确
  document.cookie = 'token='+getCookie('token')+'; expires='+time.toUTCString()
}