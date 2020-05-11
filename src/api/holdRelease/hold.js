import request from '@/utils/request'

export function getList(params) {
    return new Promise((resolve, reject) => {
        let data={"code":200,"message":"success","data":{"total_count":4,"list":[{"id":434,"code":"Holdmain-20200511172156-mnzz","type":2,"qty":1,"groups":[{"main":434,"qty":1,"flow_node":742,"supplier":3,"flow_node_name":"GC2375H-1","supplier_name":"SMIC"}],"reason":"如果就是原因","created_by":605,"created_by_name":"ruth","created_at":"2020-05-11 17:21:39"},{"id":433,"code":"Holdmain-20200511171849-mcap","type":2,"qty":3,"groups":[{"main":433,"qty":3,"flow_node":742,"supplier":3,"flow_node_name":"GC2375H-1","supplier_name":"SMIC"}],"reason":"sdfs","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-11 17:18:44"},{"id":428,"code":"Holdmain-20200511091432-rpfr","type":2,"qty":11,"groups":[{"main":428,"qty":5,"flow_node":745,"supplier":3,"flow_node_name":"GC02M1-1","supplier_name":"SMIC"},{"main":428,"qty":6,"flow_node":742,"supplier":3,"flow_node_name":"GC2375H-1","supplier_name":"SMIC"}],"reason":"ll","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-11 09:14:23"},{"id":425,"code":"Holdmain-20200509183414-iydm","type":2,"qty":8,"groups":[{"main":425,"qty":5,"flow_node":617,"supplier":13,"flow_node_name":"GC02M1-1","supplier_name":"CanSemi"},{"main":425,"qty":3,"flow_node":0,"supplier":46,"flow_node_name":"unspecified","supplier_name":"Silterra"}],"reason":"ccc","created_by":1,"created_by_name":"卢本伟","created_at":"2020-05-09 18:34:10"}]}}
        resolve(data)
    })
}
export function getListMeta(params) {
    return new Promise((resolve, reject) => {
        let data={"code":200,"message":"success","data":{"actions":{"retrieve":{"method":"get","_name":"详情"},"list":{"info":[{"value_type":"string","required":false,"label":"Process","prop":"process_name","reader":"process_name","header":"keyword","column":"process_name"},{"value_type":"string","required":false,"label":"Vendor","prop":"supplier_name","reader":"supplier_name","header":"keyword","column":"supplier_name"},{"value_type":"string","required":false,"label":"Device","prop":"flow_node_name","reader":"flow_node_name","header":"keyword","column":"flow_node_name"},{"value_type":"string","required":false,"label":"Version","prop":"node_version_name","reader":"node_version_name","header":"keyword","column":"node_version_name"},{"value_type":"string","required":true,"label":"Lot ID","prop":"lot_no","reader":"lot_no","header":"keyword","column":"lot_no"},{"value_type":"string","required":true,"label":"Wafer ID","prop":"wafer_id","reader":"wafer_id","header":"keyword","column":"wafer_id"},{"value_type":"choice","required":true,"label":"Lot Type","prop":"lot_type","reader":"lot_type","header":"choice","column":"lot_type","options":[{"value":"MP","name":"MP"},{"value":"ENG","name":"ENG"}]},{"value_type":"string","required":false,"label":"Stage","prop":"stage_name","reader":"stage_name","header":"keyword","column":"stage_name"},{"value_type":"string","required":true,"label":"Vendor Stage","prop":"supplier_stage","reader":"supplier_stage","header":"keyword","column":"supplier_stage"},{"value_type":"datetime","required":true,"label":"Update Time","prop":"updated_at","reader":"updated_at","header":"date-range","column":"updated_at","width":200}],"method":"GET","_name":"列表"},"export":{"method":["get"],"name":"Export","description":null},"meta":{"method":["get"],"name":"Meta","description":null}}}}
        resolve(data)
    })
}
export function getDetail(id,params) {
    return request({
        url: `/api/control/hold/${id}/`,
        method: 'get',
        params
    })
}
export function createView(data) {
    return request({
        url: `/api/control/hold/`,
        method: 'post',
        data
    })
}
export function holdConfirm(data,id) {
    return request({
        url: `/api/control/hold/${id}/confirm/`,
        method: 'post',
        data
    })
}