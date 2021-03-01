import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 获取
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置唯一的key
const timekey = 'HR-timestamp-key'
//  获取时间戳
export function getTimeStamp() {
  return Cookies.get(timekey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timekey, Date.now())
}
