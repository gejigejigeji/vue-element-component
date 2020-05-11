<template>
  <!--页码-->
  <scroll-pane ref='scrollPane' class="scrollPage" :padding="0">
    <div class="pagination-container">
      <div class="page">
        <el-pagination class="page_size" layout="sizes" :page-sizes="[10, 20, 50]" @size-change="onSizeChange" :total="total" :current-page.sync="myCurrent"  :page-size.sync="myLimit"></el-pagination>
        <span class="el-pagination__total" v-text="'total '+total+' items'"></span>
        <el-pagination layout="prev, pager, next, jumper" background  @current-change="onCurrentChange"  :page-size.sync="myLimit"
                       :current-page.sync="myCurrent" :total="total">
        </el-pagination>
      </div>
      <div class="page_text">
        <slot></slot>
      </div>
    </div>
  </scroll-pane>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ScrollPane from '@/components/ScrollPane'

  export default {
    name: 'Pagination',
    components: {ScrollPane},
    computed: {
      ...mapGetters([
        'pagination'
      ])
    },
    props: {
      current: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        myCurrent: this.current,
        myLimit: this.limit
      }
    },
    methods: {
      onCurrentChange(val) {
        this.$emit('on-change',{page:val})
      },
      onSizeChange(val){
        this.myCurrent = 1
        this.$emit('on-change',{pageSize: val, page: 1})
      }/*,
      onJumper(){
        console.log(this.myCurrent)
      }*/
    },
    watch: {
      current(val) {
        this.myCurrent = val
      },
      limit(val) {
        this.myLimit = val
      }
    }
  }
</script>
