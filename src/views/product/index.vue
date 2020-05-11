<template>
  <MyContainer>
    <MyTitle title="Product"></MyTitle>
    <MyAction @on-reset="onReset" @on-search="onSearch">
      <MyButton :btn="'add'" @click="hadnleInfo('add')"></MyButton>
      <MyButton :btn="'export'" :disabled="tableData.length<1" @click="onExport()" :loading="exportLoad"></MyButton>
      <MyButton :btn="'refresh'" @click="onSearch()"></MyButton>
    </MyAction>

    <WccTable v-if="columnData.length>0" :tableData="tableData" :form="form" :column="columnData">
    </WccTable>

    <MyPagination ref="Pagination" :current="form.page" :limit="form.page_size" :total="form.total" @on-change="pageChange"></MyPagination>
    <list-view ref="listView"></list-view>
  </MyContainer>
</template>

<script>
  import { mapGetters } from 'vuex'

  import {useExcel} from "@/views/fn_api/list.js";
  import {
    getList as getData,
    getListMeta
  } from '@/api/products/index.js'
  import listView from './components/listView.vue'

  export default {
    name: "baseProduct",
    components: {listView},
    computed: {
      ...mapGetters([
        'pagination',
        'permission',
        'loading'
      ]),
    },
    async created() {
      this.form.page_size = this.pagination.limit;
        await this.getListMeta();
      await this.getList();
    },
    data() {
      return {
        exportLoad: false,
        multiple: [],
        status_list: [],
        form: {
          page: 1,
          page_size:20,
          total: 5,
        },
        tableData:[],
        columnData:[]
      }
    },
    methods:{
        getListMeta(){
        this.loading.all = true;
          getListMeta().then(res => {
           let list = res.data.actions.list.info;
           this.handleForm(list);
           this.columnData = list;
         }).catch(() => {
           this.loading.all = false;
         });
           this.loading.all = false;
         },
        getList() {
            this.loading.all = true;
          getData(this.form).then(res => {
               console.log(res)
                this.tableData = res.data.list;
                this.form.total = res.data.total_count;
                this.loading.all = false;
            }).catch((err) => {
              console.log(err)
                this.loading.all = false;
            });
        },
      handleForm(list) {
        list.map(a => {
          if (a.reader) {
            this.$set(this.form, a.reader, '');
          }
        });
      },
      hadnleInfo(type){
        switch ( type ){
          case 'add':
            this.handlePage({type,name:'handleFlow'});
            break;
          case 'edit':
            this.$refs.listView.getInfoView(type);
            break;
          case 'view':
            this.handlePage({type,id:4});
            break
        }
      },
      handlePage({type, id, name}){
        this.$store.dispatch('delVisitedViews', {name: name||'handleFlow'}).then(() => {
          setTimeout(()=> {
            this.$router.push({
              name: name||'handleFlow',
              query: { type, id }
            })
          }, 1)
        })
      },
      onExport(){
        let tHeader = [];
        let tProp = [];
        let data = JSON.parse(JSON.stringify(this.tableData));
        let option = {};
        this.columnData.map(item => {
          tHeader = [...tHeader, item.label];
          tProp = [...tProp, item.prop];
          if (item.prop == 'state') {
            option[item.prop] = item.options;
          }
        });
        data.map(item => {
          option.state.map(sitem => {
            if (item.state == sitem.value) {
              item.state = sitem.name;
            }
          });
        });
        useExcel().onExport({
          name: 'product',
          data,
          tHeader,
          tProp
        })
      },
      onSearch() {
        this.pageChange({page: 1})
      },
      onReset(){
          this.handleForm(this.columnData);
          this.onSearch();
      },
      pageChange({page, pageSize }) {
        this.form.page = page || this.form.page;
        this.form.page_size = pageSize || this.form.page_size;
        this.getList()
      },
    }
  }
</script>
