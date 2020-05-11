import Vue from 'vue'
import VueRouter from 'vue-router'
export const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(VueRouter)
import Layout from '@/views/layout/Layout'


const routes = [
  { name:'login', path: '/login', component: _import('login/index'), hidden: true },
  { name:'401', path: '/401', component: _import('errorPage/401'), hidden: true },
  { name:'404', path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: 'home',
    children: [
      {path: 'home', component: _import('index/home'), name: 'home', meta: { title: 'home', icon: 'home', noCache: true }},
      { path: 'personal', name: 'personal', component: _import('index/personal'), meta: { title: 'personal'}, hidden: true}
    ]
  },
  // { name:'drag', path: '/drag', component: Home },
  {
    path: '/basic',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {title: 'Basic archives', icon: 'm_base', auth: 'base'},
    children: [
      {path: 'product', component: _import('product/index'), name: 'baseProduct', meta: { title: 'Table', auth: 'baseProduct'}},
      // {path: 'product/handle', component: _import('product/handles'), name: 'baseProductHandle', meta: { title: 'Product handle', auth: 'baseProduct'}, hidden: true},
      // {path: 'product/createFlow', component: _import('product/components/createFlow'), name: 'handleFlow', meta: { title: 'Flow', auth: 'baseProduct'}, hidden: true},
      // {path: 'process', component: _import('process/index'), name: 'baseProcess', meta: { title: 'Process', auth: 'baseProcess',},hidden: false},
      // {path: 'process/processHandle', component: _import('process/handles'), name: 'handleProcess', meta: { title: 'handle Process', auth: 'baseProcess',},hidden: true},
      {path: 'processFlow', component: _import('processFlow/index'), name: 'baseProcessFlow', meta: { title: 'Flow', auth: 'baseProcessFlow'}},
      // {path: 'processFlow/createFlow', component: _import('processFlow/components/createFlow'), name: 'processHandleFlow', meta: { title: 'Flow', auth: 'baseProcessFlow',},hidden: true},
      {path: 'vendor', component: _import('Vendor/index'), name: 'baseVendor', meta: { title: 'CompositionApi', auth: 'baseVendor',},hidden: false},
      // {path: 'vendor/handles', component: _import('Vendor/handles'), name: 'handleVendor', meta: { title: 'Vendor handles', auth: 'baseVendor',},hidden: true},
      // {path: 'gcstage', component: _import('GCstage/index'), name: 'baseGCstage', meta: { title: 'GC stage', auth: 'baseGCstage',},hidden: false},
      // {path: 'gcstage/gcstagehandle', component: _import('GCstage/handles'), name: 'handleGCstage', meta: { title: 'Handle GC state', auth: 'baseGCstage',},hidden: true},
      // {path: 'vendorstage', component: _import('VendorStage/index'), name: 'baseVendorStage', meta: { title: 'Vendor Stage', auth: 'baseVendorStage',},hidden: false},
      // {path: 'vendorstage/handlevendorstage', component: _import('VendorStage/handles'), name: 'handleVendorStage', meta: { title: 'VendorStage', auth: 'baseVendorStage',},hidden: true},
      // {path: 'gcstandardFlie', component: _import('GCstandardFlie/index'), name: 'baseGCstandardFlie', meta: { title: 'GC standard Flie', auth: 'baseGCstandardFlie',},hidden: false},
      // {path: 'gcstandardFlie/handlegcstandardFlie', component: _import('GCstandardFlie/handles'), name: 'handleGCstandard', meta: { title: 'handleGCstandard', auth: 'baseGCstandardFlie',},hidden: true},
      // {path: 'vendorfile', component: _import('VendorFile/index'), name: 'baseVendorFile', meta: { title: 'Vendor File', auth: 'baseVendorFile',},hidden: false},
      // {path: 'vendorfile/handlevendorfile', component: _import('VendorFile/handles'), name: 'handleVendorFile', meta: { title: 'handle', auth: 'baseVendorFile',},hidden: true},
    ]
  },
  {
    path: '/prod',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {title: 'Production', icon: 'm_base', auth: 'prod'},
    children: [
      {path: 'production', component: _import('productionTracking/index'), name: 'productionTracking', meta: { title: 'Tabs', auth: 'production'}},
      // {path: 'production/history', component: _import('productionTracking/components/history/index'), name: 'productionHistory', meta: { title: 'History', auth: 'production'},hidden: true},
      // {path: 'production/handle', component: _import('productionTracking/handles'), name: 'handleProductionTracking', meta: { title: 'Production handle', auth: 'production'}, hidden: true},
      // {path: 'production/handleShipTo', component: _import('productionTracking/components/shipTo/handles'), name: 'handleShipTo', meta: { title: 'ShipTo', auth: 'production'}, hidden: true},
      // {path: 'trackingProcessingLog', component: _import('trackingProcessingLog/index'), name: 'trackingProcessingLog', meta: { title: 'TrackProcessLog', auth: 'production'}},
      // {path: 'trackingProcessingLog/handle', component: _import('trackingProcessingLog/handles'), name: 'handleTrackingProcessingLog', meta: { title: 'TrackProcess', auth: 'production'}, hidden: true},
      // {path: 'po', component: _import('PO/index'), name: 'po', meta: { title: 'PO', auth: 'production'}},
      // {path: 'po/handle', component: _import('PO/handles'), name: 'handlePo', meta: { title: 'handle PO', auth: 'production'}, hidden: true},
      {path: 'holdRelease', component: _import('holdRelease/index'), name: 'holdRelease', meta: { title: 'span Table', auth: 'production'}},
    ]
  },
]
export const constantRouterMap = [...routes]

const router = new VueRouter({
  routes: constantRouterMap
})

export default router
