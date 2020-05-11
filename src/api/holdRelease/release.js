import request from '@/utils/request'

export function getList(params) {
    return new Promise((resolve, reject) => {
        let data={"code":200,"message":"success","data":{"total_count":3,"list":[{"id":121,"code":"Releasemain-20200511171857-kvcj","qty":2,"groups":[{"main":121,"qty":2,"flow_node":742,"supplier":3,"flow_node_name":"GC2375H-1","supplier_name":"SMIC"}],"reason":"sdf","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-11 17:18:55"},{"id":118,"code":"Releasemain-20200511091457-jlve","qty":3,"groups":[{"main":118,"qty":1,"flow_node":745,"supplier":3,"flow_node_name":"GC02M1-1","supplier_name":"SMIC"},{"main":118,"qty":2,"flow_node":742,"supplier":3,"flow_node_name":"GC2375H-1","supplier_name":"SMIC"}],"reason":"pp","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-11 09:14:52"},{"id":117,"code":"Releasemain-20200509183430-huna","qty":4,"groups":[{"main":117,"qty":2,"flow_node":617,"supplier":13,"flow_node_name":"GC02M1-1","supplier_name":"CanSemi"},{"main":117,"qty":2,"flow_node":0,"supplier":46,"flow_node_name":"unspecified","supplier_name":"Silterra"}],"reason":"ccc","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-09 18:34:27"}]}}
        resolve(data)
    })
}

export function getListMeta(params) {
    return request({
        url: '/api/control/release/meta',
        method: 'get',
        params
    })
}

export function getDetail(id,params) {
    return request({
        url: `/api/control/release/${id}/`,
        method: 'get',
        params
    })
}
export function createView(data) {
    return request({
        url: `/api/control/release/`,
        method: 'post',
        data
    })
}
export function holdConfirm(data,id) {
    return request({
        url: `/api/control/release/${id}/confirm/`,
        method: 'post',
        data
    })
}