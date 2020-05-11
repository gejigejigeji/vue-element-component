import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getSign, hasPermission } from '@/utils/auth'//getSign
NProgress.configure({ showSpinner: false })
const whiteList = ['/login','/401','/404'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (getSign()&& getSign()!== 'undefined') {
    if (!store.getters.is_info || store.getters.is_info === '') { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo', {}).then(() => { //获取用户权限角色信息
        store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
          if (hasPermission( to )) {
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
            NProgress.done()
          } else {
            next({ name: 'home' })
            NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
          }
        }).catch(() => {
          next({ path: '/home' })
          NProgress.done()
        })
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          next({ name: 'login'})
          NProgress.done()
        })
      })
    } else {
      if (hasPermission( to )) {
        next()
        NProgress.done()
      } else {
        next({ name: 'home', replace: true })
        //next({ name: '401', query: { noGoBack: true }})
        NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history 模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
