import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = () => ({
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {}
})

// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 存到vuex的state
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步   持久化
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用浅拷贝的方式去赋值对象,数据更新,才会触发组件各更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }

}
const actions = {
  async login(context, data) {
    // 经过响应拦截器的处理,这里的result实际上就是token
    const result = await login(data)
    context.commit('setToken', result) // 写入时间戳
    setTimeStamp() // 将当前的最新时间写入缓存
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  // 退出登录
  logout(context) {
    context.commit('setUserInfo', {})
    context.commit('removeToken')
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
