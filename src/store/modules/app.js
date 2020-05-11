import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('scmSidebar'),
      show: true
    }
  },
  mutations: {
    SHRINK_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('scmSidebar', 1)
      } else {
        Cookies.set('scmSidebar', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.show = !state.sidebar.show
    },
    SHOW_SIDEBAR: state => {
      state.sidebar.show = true
    },
    OUT_SIDEBAR: state => {
      state.sidebar.show = false
    }
  },
  actions: {
    shrinkSideBar({ commit }) {
      commit('SHRINK_SIDEBAR')
    },
    toggleSidebar({ commit }){
      commit('TOGGLE_SIDEBAR')
    },
    showSidebar({ commit }){
      commit('SHOW_SIDEBAR')
    },
    outSidebar({ commit }){
      commit('OUT_SIDEBAR')
    }
  }
}

export default app
