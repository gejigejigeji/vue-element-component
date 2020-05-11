<template>
  <div class="container">
    <MyTitle title="单据流情况">
      <el-select v-model="form.type" placeholder="单据流" @change="getListData">
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index"></el-option>
      </el-select>
    </MyTitle>
    <MyTable ref="oneTable" :columnData="columnData" :tableData="tableData">
<!--      <template slot="delivery_time" scope="scope">-->
      <template v-slot:delivery_time="scope" >
        <span>{{scope.row.delivery_time | formatDate}}</span>
      </template>
<!--      <template slot="logistics_receiving_time" scope="scope">-->
      <template v-slot:logistics_receiving_time="scope" >
        <span>{{scope.row.logistics_receiving_time | formatDate}}</span>
      </template>

    </MyTable>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { apiAdminData } from '@/api/index'

  export default {
    name: "adminDatas",
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
        columnData: [
          {label: '待确认', prop: 'type_name'},
          {label: '已确认订单', prop: 'status_name'},
          {label: '未发货', reader: 'delivery_time'},
          {label: '部分发货', prop: 'out_outbound_order_no'},
          {label: '全部发完', prop: 'vendee_company_name'}
        ],
        tableData: []
      }
    },
    mounted(){
      // this.getListData()
    },
    methods:{
      getListData(){
        this.loading.all = true
        const data = {...this.form}
        // apiAdminData(data).then(response => {
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
