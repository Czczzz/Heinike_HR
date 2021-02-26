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
