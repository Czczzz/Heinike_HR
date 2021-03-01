import request from '@/utils/request'

export function login(data) {
  // 因为所有的接口都要跨域 表示所有的接口要带 /api
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

// 获取用户的基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile/',
    method: 'post'
  })
}

// 获取用户的基本资料里的头像
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
    //  该请求为get 默认就是 不用写
  })
}

// export function getInfo(token) {
//   return request({

//   })
// }

// export function logout() {
//   return request({

//   })
// }

