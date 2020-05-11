import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './icons' // icon
import store from './store'//store
import drag from 'vue-grid-layout'
import ElementUI from 'element-ui'
import './components/index' // components
import './style/index.less' // global css
import './permission'
import locale from 'element-ui/lib/locale/lang/en'
import comapi from '@vue/composition-api'

Vue.use(drag);
Vue.use(comapi);
Vue.use(ElementUI, { size: 'small', locale});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
