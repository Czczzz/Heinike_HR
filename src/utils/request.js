// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
// import { config } from '@vue/test-utils'
import axios from 'axios'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 设置超时时间
})
// token过期时间 2小时
const TimeOut = 2 * 60 * 60 * 1000
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function(response) {
  // axios默认加了一层data
  const { success, message, data } = response.data
  // 根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, function(error) {
  Message.error(error.message) // 提示错误消息
  // 对响应错误做点什么
  return Promise.reject(error)// 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 导出axios实例
export default service
