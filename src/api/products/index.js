import request from '@/utils/request'

export function getList(params) {
    return new Promise((resolve, reject) => {
        let data={"code":200,"message":"success","data":{"total_count":540,"list":[{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC2375","name":"GC2375B-WC1X0","name_old":"GC2375BW","model_code":"GC2375B-WC1X0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COB","sell_state":1,"note":"","product_line":54,"product_line_name":"GC2375","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC2053","name":"GC20A3-WA1X0","name_old":"GC20A3W","model_code":"GC20A3-WA1X0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":63,"product_line_name":"GC2053","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"2M","spec_model":"GC2053","name":"GC20A3T-C47Y0","name_old":"GC20A3","model_code":"GC20A3T-C47Y0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":193,"product_line_name":"GC2053","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"PC","spec_model":"C032A","name":"C032A-C20YA","name_old":"C032A","model_code":"C032A-C20YA-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":183,"product_line_name":"C032A","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC02M0","name":"GC02M0-C24Y9","name_old":"GC02M0-C24Y9","model_code":"GC02M0-C24Y9-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":182,"product_line_name":"GC02M0","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"VGA","spec_model":"GC0303","name":"GC0303-SA9W0","name_old":"GC0303-SA9W0","model_code":"GC0303-SA9W0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"PLCC","sell_state":1,"note":"","product_line":198,"product_line_name":"GC0303","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"VGA","spec_model":"GC0307","name":"GC0307-C20Y9","name_old":"GC0307","model_code":"GC0307-C20Y9-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"PLCC","sell_state":1,"note":"","product_line":197,"product_line_name":"GC0307","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"FP","spec_model":"GC07S0","name":"GC07S0","name_old":"GC07S0","model_code":"GC07S0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":179,"product_line_name":"GC07S0","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"PC","spec_model":"GC1009","name":"GC1009-MAAA0","name_old":"GC1009-MAAA0","model_code":"GC1009-MAAA0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":196,"product_line_name":"GC1009","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"13M","spec_model":"GC13023","name":"GC13023-MAFC0","name_old":"GC13023-MAFC0","model_code":"GC13023-MAFC0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":195,"product_line_name":"GC13023","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"13M","spec_model":"GC13023","name":"GC13023-MAFD0","name_old":"GC13023-MAFD0","model_code":"GC13023-MAFD0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":195,"product_line_name":"GC13023","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"13M","spec_model":"GC13033","name":"GC13033-MAFD0","name_old":"GC13033CM8585","model_code":"GC13033-MAFD0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":194,"product_line_name":"GC13033","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"13M","spec_model":"GC13033","name":"GC13033-WA1N0","name_old":"GC13033W","model_code":"GC13033-WA1N0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COB","sell_state":1,"note":"","product_line":174,"product_line_name":"GC13033","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"1M","spec_model":"GC1323","name":"GC1323","name_old":"GC1323","model_code":"GC1323-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"PLCC","sell_state":1,"note":"","product_line":173,"product_line_name":"GC1323","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"Bridge","spec_model":"GC16B0","name":"GC16B0-MAFD0","name_old":"GC16B0CM8585","model_code":"GC16B0-MAFD0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":172,"product_line_name":"GC16B0","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"数码","cat_level_2":"安防","cat_level_3":"2M","spec_model":"GC2053","name":"GC2053-WC1X0","name_old":"GC2053W","model_code":"GC2053-WC1X0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COB","sell_state":1,"note":"","product_line":193,"product_line_name":"GC2053","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"COM","cat_level_2":"COM","cat_level_3":"2M","spec_model":"GC20A3","name":"GC20A3-MAJD0","name_old":"GC20A3CM8888","model_code":"GC20A3-MAJD0-4.7","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COM","sell_state":1,"note":"","product_line":170,"product_line_name":"GC20A3","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC2355","name":"GC2355-WC1X0","name_old":"GC2355W","model_code":"GC2355-WC1X0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COB","sell_state":1,"note":"","product_line":58,"product_line_name":"GC2355","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC2375HB","name":"GC2375HB-WC1X0","name_old":"GC2375HBW","model_code":"GC2375HB-WC1X0-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"COB","sell_state":1,"note":"","product_line":169,"product_line_name":"GC2375HB","state":1,"updated_at":"2020-04-07 10:57:06"},{"cat_level_1":"CIS","cat_level_2":"sensor","cat_level_3":"2M","spec_model":"GC2375HS","name":"GC2375HS-C23YA","name_old":"GC2375HS-C23YA","model_code":"GC2375HS-C23YA-4","unit":"片","spec":"","tax":"集成电路","product_state":"成品","package_type":"CSP","sell_state":1,"note":"","product_line":168,"product_line_name":"GC2375HS","state":1,"updated_at":"2020-04-07 10:57:06"}]}}
        resolve(data)
    })
}
export function getListMeta(params) {
    return new Promise((resolve, reject) => {
        let data={"code":200,"message":"success","data":{"actions":{"list":{"info":[{"value_type":"string","required":true,"label":"Group1","prop":"cat_level_1","reader":"cat_level_1","header":"keyword","column":"cat_level_1","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Group2","prop":"cat_level_2","reader":"cat_level_2","header":"keyword","column":"cat_level_2","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Group3","prop":"cat_level_3","reader":"cat_level_3","header":"keyword","column":"cat_level_3","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Specifications","prop":"spec_model","reader":"spec_model","header":"keyword","column":"spec_model","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Sales Device","prop":"name","reader":"name","header":"keyword","column":"name","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Sales Device (old)","prop":"name_old","reader":"name_old","header":"keyword","column":"name_old","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"Device code","prop":"model_code","reader":"model_code","header":"keyword","column":"model_code","can_search":true,"hide":false},{"value_type":"string","required":true,"label":"unit","prop":"unit","reader":"unit","header":"keyword","column":"unit","can_search":true,"hide":false},{"value_type":"choice","required":false,"label":"Status","prop":"state","reader":"state","header":"choice","column":"state","options":[{"value":1,"name":"正常"},{"value":0,"name":"停用"}],"width":80,"can_search":true,"hide":false},{"value_type":"datetime","required":true,"label":"Update Time","prop":"updated_at","reader":"updated_at","header":"date-range","column":"updated_at","width":200,"can_search":true,"hide":false}],"method":"GET","_name":"列表"},"export":{"method":["get"],"name":"Export","description":null},"meta":{"method":["get"],"name":"Meta","description":null}}}}
        resolve(data)
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
//获取flow
export function getFlow(id) {
    return request({
        url: `/api/base/product-lines/${id}/show-flow-chart/`,
        method: 'get',
    })
}
//获取flow 标题
export function getFlowProcess() {
    return request({
        url: `/api/base/process/`,
        method: 'get',
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
export function getoptions() {
    return request({
        url: `/api/base/product-lines/`,
        method: 'get',
    })
}