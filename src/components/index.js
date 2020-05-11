/**
 * Created by jojo_yi on 2020/4/1.
 */
import Vue from 'vue'
import Pagination from './PageElement/Pagination.vue'
import TabsTitle from './PageElement/Title'
import Container from './PageElement/Container'
import Action from './PageElement/Action'
import TableList from './Table/index.vue'
import TableFilter from './Table/filter.vue'
import WccTable from './WccTable/index'
import spanTable from './WccTable/spanTable'
import Button from './PageButton/Button.vue'

// 页面操作按钮
Vue.component('MyButton', Button)// 带提示文字的按钮显示

// 页面公用显示
Vue.component('MyPagination', Pagination)// 翻页
Vue.component('MyTitle', TabsTitle)// 页面标题
Vue.component('MyContainer', Container)// 整体页面
Vue.component('MyAction', Action)// 页面操作栏

// 表格
Vue.component('MyTable', TableList)// 单行表头的表格
Vue.component('TableFilter', TableFilter)// 列表页筛选表格
Vue.component('WccTable', WccTable)// 列表页筛选表格
Vue.component('SpanTable', spanTable)// 列表页筛选表格

