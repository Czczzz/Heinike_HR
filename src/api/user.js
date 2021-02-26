import request from '@/utils/request'

export function login(data) {
  // 因为所有的接口都要跨域 表示所有的接口要带 /api
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({

  })
}

export function logout() {
  return request({

  })
}
