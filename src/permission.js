import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whileList = ['/login', '404']

router.beforeEach(async function(to, from, next) {
  NProgress.start()
  // 首先判断有无token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
      next() // 就直接放行
    }
  } else {
    // 如果没有token
    if (whileList.indexOf(to.path) > -1) {
      // 如果找到了 表示在名单里面
      next()
    } else {
      next('/login') // 调到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
