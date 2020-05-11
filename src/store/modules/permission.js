import { constantRouterMap } from '@/router'
import { hasPermission } from '@/utils/auth'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param RouterMap
 */
function filterAsyncRouter( RouterMap ) {
  let accessedRouters = RouterMap.filter(route => {
    if (hasPermission( route )) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter( route.children )
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ dispatch, commit }) {
      return new Promise((resolve) => {
        const staticRouterMap = JSON.parse(JSON.stringify(constantRouterMap))
        let accessedRouters = filterAsyncRouter( staticRouterMap )
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
