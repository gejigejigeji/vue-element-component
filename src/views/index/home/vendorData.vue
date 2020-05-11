<template>
  <div class="container">
    <MyTitle title="订单情况">
      <el-select v-model="form.type" placeholder="单据流" @change="getListData">
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index"></el-option>
      </el-select>
    </MyTitle>
    <MyTable ref="oneTable" :columnData="columnData1" :tableData="tableData1">
      <!--      <template slot="delivery_time" slot-scope="scope">-->
      <template v-slot:delivery_time="scope">
        <span>{{scope.row.delivery_time | formatDate}}</span>
      </template>
      <!--      <template slot="logistics_receiving_time" slot-scope="scope">-->
      <template v-slot:logistics_receiving_time="scope">
        <span>{{scope.row.logistics_receiving_time | formatDate}}</span>
      </template>

    </MyTable>
    <MyTitle title="收发货情况"></MyTitle>
    <MyTable ref="oneTable" :columnData="columnData2" :tableData="tableData2"></MyTable>
    <MyTitle title="收付款情况"></MyTitle>
    <MyTable ref="oneTable" :columnData="columnData3" :tableData="tableData3"></MyTable>
    <MyTable ref="oneTable" :columnData="columnData4" :tableData="tableData4"></MyTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { apiVendorData } from '@/api/index'

  export default {
    name: "vendorData",
    computed: {
      ...mapGetters([
        'permission',
        'loading',
      ])
    },
    data() {
      return {
        list: [{id: 'num', name: '单据数量'}, {id: 'price', name: '单据金额'}],
        form: {
          type: 'num'
        },
        columnData1: [
          {label: '待确认', prop: 'type_name'},
          {label: '已确认订单', prop: 'status_name'},
          {label: '未发货', reader: 'delivery_time'},
          {label: '部分发货', prop: 'out_outbound_order_no'},
          {label: '全部发完', prop: 'vendee_company_name'}
        ],
        columnData2: [
          {label: '待收货', prop: 'type_name'},
          {label: '已收货', prop: 'status_name'},
          {label: '已发货笔数', reader: 'delivery_time'},
          {label: '已收货', prop: 'out_outbound_order_no'},
          {label: '其他方确认中', prop: 'vendee_company_name'},
          {label: '未确认收货', prop: 'finance_company_name'}
        ],
        columnData3: [
          {label: '总应收', prop: 'type_name'},
          {label: '已收', prop: 'status_name'},
          {label: '部分已收', reader: 'delivery_time'},
          {label: '未收款', prop: 'out_outbound_order_no'},
          {label: '未到期', prop: 'vendee_company_name'},
          {label: '应收逾期', prop: 'finance_company_name'},
          {label: '未确认收款', prop: 'total_quantity'}
        ],
        columnData4: [
          {label: '总应付', prop: 'type_name'},
          {label: '已付', prop: 'status_name'},
          {label: '部分已付', reader: 'delivery_time'},
          {label: '未付款', prop: 'out_outbound_order_no'},
          {label: '未到期', prop: 'vendee_company_name'},
          {label: '应付逾期', prop: 'finance_company_name'},
          {label: '付款未确认', prop: 'total_quantity'}
        ],
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: []
      }
    },
    mounted(){
      console.log('kkkkkk')
      // this.getListData()
    },
    methods:{
      getListData(){
        this.loading.all = true
        const data = {...this.form}
        // apiVendorData(data).then(response => {
        //   this.tableData = response.data.list
        //   this.loading.all = false
        // }).catch(() => {
        //   this.loading.all = false
        //   this.tableData = []
        // })
      }
    }
  }
</script>

<style scoped>

</style>
