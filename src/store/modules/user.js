import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getSign, setSign, removeSign } from '@/utils/auth'

const user = {
  state: {
    is_info: '',
    name:  getSign()||'',
    user_id: '',
    pages: [],
    permission: {}
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, user_id) => {
      state.user_id = user_id
    },
    SET_ISINFO: (state, is_info) => {
      state.is_info = is_info
    },
    SET_PAGES: (state, pages) => {
      state.pages = pages
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const data = response.data
          setSign(data.name||'')
          commit('SET_NAME', data.name||'')
          commit('SET_USERID', data.id||'')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        //权限有数据后删除这两行
        commit('SET_ISINFO', '1')
        resolve()
        /*getUserInfo(data).then(response => {
          if (!response.data) {
            reject('error')
          }
          const data = response.data
          commit('SET_PAGES', data['pages']||[])
          commit('SET_PERMISSION', data['permission']||{})
          commit('SET_ISINFO', '1')
          resolve(response)
        }).catch(error => {
          reject(error)
        })*/
      })
    },
    // 登出
    LogOut({ commit }, data) {
      return new Promise((resolve, reject) => {
        logout(data).then(() => {
          commit('SET_ISINFO', '')
          commit('SET_NAME', '')
          commit('SET_USERID', '')
          commit('SET_PAGES', [])
          commit('SET_PERMISSION', {})
          removeSign()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ISINFO', '')
        commit('SET_NAME', '')
        commit('SET_USERID', '')
        commit('SET_PAGES', [])
        commit('SET_PERMISSION', {})
        removeSign()
        resolve()
      })
    }
  }
}

export default user
