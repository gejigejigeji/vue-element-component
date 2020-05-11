import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import setting from './modules/setting'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    setting,
  },
  getters
});

export default store
