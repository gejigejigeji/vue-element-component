import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/api/base/process-flow/',
        method: 'get',
        params
    })
}
export function getListMeta(params) {
    return request({
        url: '/api/base/process-flow/meta',
        method: 'get',
        params
    })
}

//创建flow
export function createFlow(data,id) {
    return request({
        url: `/api/base/product-lines/${id}/create-flow-chart/`,
        method: 'post',
        data
    })
}
//编辑flow
export function updateFlow(data,id) {
    return request({
        url: `/api/base/product-lines/${id}/create-flow-chart/`,
        method: 'put',
        data
    })
}
//获取flow
export function getFlow(id) {
    return request({
        url: `/api/base/product-lines/${id}/show-flow-chart/`,
        method: 'get',
    })
}
//获取flow 标题
export function getFlowProcess(params) {
    return request({
        url: `/api/base/process/`,
        method: 'get',
        params
    })
}
//获取flow 下拉框
export function getFlowOptions(id) {
    return request({
        url: `/api/base/process/suppliers/`,
        method: 'get',
    })
}
//获取flow 根节点-下拉框
export function getoptions(params) {
    return request({
        url: `/api/base/product-lines/`,
        method: 'get',
        params
    })
}