import { getToken, setToken, removeToken } from '@/utils/auth'

const state = () => ({
  token: getToken() // 设置token初始状态   token持久化 => 放到缓存中
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
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
