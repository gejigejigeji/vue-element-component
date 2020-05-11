import axios from 'axios'
import { megError } from '@/utils/notice'
import store from '@/store'
import router from '@/router'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 20000, // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 文件下载
    if(response.request.responseType==='arraybuffer'){
      return response
    }else {
      /**
       * code为非200是抛错
       */
      const res = response.data
      if (res['code']&&Number(res['code']) === 200){
        return response.data
      }else {
        if (Number(res['code']) === 955) {
          store.dispatch('FedLogOut').then(() => {
            router.push({ path: '/login' })
            location.reload()// 为了重新实例化vue-router对象 避免bug
            //megError('您还未登陆，请重新登陆')
          })
        } else if(Number(res['code']) === 956){ // 956:没有权限
          megError(res['message'])
          router.push({ path: '/401', query: { noGoBack: true }})
        } else {
          const text = res['message']?res['message']+'['+res['code']+']':'Exception returned, please try again later'
          megError(text)
        }
        return Promise.reject('error')
      }
    }
  },
  error => {
    if(error.response){
      megError('Network exception, please try again later['+error.config.url+':'+error.response.status+']')
    }else {
      megError('Network exception, please try again later')
    }
    return Promise.reject(error)
  }
)
export default service
