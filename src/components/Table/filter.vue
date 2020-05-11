<template>
  <!--表格-->
<div ref="tableWapper">
  <el-table ref="multipleTable" class="filter_table" :data="tableData" :empty-text="empty" :size="size" border :span-method="cellRowMethod" :max-height="maxHei||tableHeight"
            @row-click="handleRow" :row-class-name="handleRowClass" @header-click="handleHeader">
    <template v-for="list in columnData" v-if="!list.hidden">
      <el-table-column type="expand" label-class-name="column_type" v-if="list.type&&list.type==='expand'">
        <template slot-scope="scope">
          <slot :name="list.reader" :row="scope.row" v-if="list.reader"></slot>
          <template v-else>
            {{scope.row[list.prop]}}
          </template>
        </template>
      </el-table-column>
      <el-table-column type="selection" label-class-name="column_type" :fixed="list.fixed" :width="list.width||'50'" v-else-if="list.type&&list.type==='selection'"></el-table-column>
      <el-table-column :label="list.label" label-class-name="column_type" :type="list.type" :width="list.width||'50'" :fixed="list.fixed" v-else-if="list.type"></el-table-column>
      <el-table-column :label="list.label" :prop="list.prop"
                       :label-class-name="list.header&&((list.header==='num'&&(form[list.input][0]||form[list.input][1]))||(list.header!=='num'&&form[list.input].length>0))?'highlight':list.header?'filter':''"
                       :width="list.width" :min-width="list.minWidth||'100'" :fixed="list.fixed" v-else><!--:min-width="list.minWidth+'px'||'100px'" -->
        <template slot="header" slot-scope="scope">
          <span>{{list.label}}</span>
          <i class="show_clear el-icon-close" @click.stop="handleClear(list)" v-if="list.header"></i>
        </template>
        <template slot-scope="scope">
          <slot :name="list.reader" :row="scope.row" :$index="scope.$index" v-if="list.reader"></slot>
          <template v-else>
            {{scope.row[list.prop]}}
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <el-form :model="form" ref="tableForm" :inline="true" :rules="tableRules" label-width="0" label-position="left">
    <FilterPanel :ref="list.prop" v-if="list.header" v-for="list in columnData" :list="list">
      <el-date-picker v-if="list.header==='date'"  v-model="form[list.input]" type="daterange" start-name="date-star" end-name="date-end" range-separator="-" :editable="false" :clearable="false"
                      start-placeholder="start" end-placeholder="end"
                      :picker-options="pickOpt" value-format="yyyy-MM-dd" >
      </el-date-picker>
      <template v-else-if="list.header==='multiple'">
        <el-checkbox :indeterminate="form[list.input].length>0&&form[list.input].length!==list.options.length"
                     v-model.native="list.all" @change="handleAll(list)">all</el-checkbox>
        <el-checkbox-group v-model="form[list.input]">
          <el-checkbox v-for="item in list.options" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <el-form-item class="filter_num" :prop="list.input" :rules="tableRules.num" v-else-if="list.header==='num'">
        <el-input v-model="form[list.input][0]" placeholder="min" clearable size="mini"></el-input>
        <span class="line_num">--</span>
        <el-input v-model="form[list.input][1]" placeholder="max" clearable size="mini"></el-input>
        <p class="tip_num">Filter range contains minimum and maximum values</p>
      </el-form-item>
      <el-form-item :prop="list.input" :rules="tableRules.text"  v-else>
        <el-input v-model="form[list.input]" placeholder="Please enter search keywords" clearable size="mini">
        </el-input>
      </el-form-item>
    </FilterPanel>
  </el-form>
</div>

</template>

<script>
  import Vue from 'vue';
  import { mapGetters } from 'vuex'
  import { rangeShortcuts } from '@/utils/picker'
  import { validateNum, validPoint, validateSpace } from '@/utils/validate'
  import FilterPanel from './components/filter_header'
  import { megSuc, megError } from '@/utils/notice'

  export default {
    name: 'oneTable',
    components: { FilterPanel },
    computed: {
      ...mapGetters([
        'table'
      ]),
      tableHeight(){
        if(this.mode==='handle'){
          let [ header, padding, top, name, handle, pagination, footer ] = [ 48, 24*2+13+4, 62+70, 0, 40+8, 51, 60 ]
          return document.body.clientHeight - header - padding - top - name - pagination - handle - footer - 7
        }else if(this.mode==='col'){

        }else {
          let [ header, tabs, handle, pagination, footer ] = [ 48+8, 42, 8+8+48+8, 51, 0 ]
          return document.body.clientHeight - header  - tabs - handle - pagination - footer - 7
        }
      }
    },
    props: {
      empty: {
        type: String,
        default: 'Sorry, no data available'
      },
      handle: {
        type: String,
        default: ''
      },
      isOpt: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      columnData: {
        type: Array,
        default: []
      },
      size: {
        type: String,
        default: 'medium'
      },
      tableData: {
        type: Array,
        default: []
      },
      cellArry: {
        type: Array,
        default: () => {
          return []
        }
      },
      mode: {
        type: String,
        default: 'list'
      },
      maxHei: {
        type: [String, Number],
        default: ''
      },
      rowClass: {
        type: Function,
        default: null
      }
    },
    data() {
      const validNum = (rule, value, callback) => {
        if ((value[0]&&!validateNum(value[0]))||(value[1]&&!validateNum(value[1]))) {
          callback(new Error('Can only be an integer'))
        }else if ((value[0]||value[0]=='0')&&(value[1]||value[1]=='0')&&Number(value[0])>Number(value[1])) {
          callback(new Error('The maximum value should not be less than the minimum value'))
        }else {
          callback()
        }
      }
      const valSpace = (rule, value, callback) => {
        if (value&&!validateSpace(value)) {
          callback(new Error('Not all spaces'))
        }else {
          callback()
        }
      }
      return {
        myForm: {},
        isChange: false,
        pickOpt: { shortcuts: rangeShortcuts },
        tableRules: {
          num: [{ required: false, trigger: 'blur', validator: validNum }],
          text: [{ required: false, trigger: 'blur', validator: valSpace}]
        },
        filterPanels: {},
        multipleSelection: [],
        rowList: []
      }
    },
    mounted() {
      this.myForm = JSON.stringify(this.form)
    },
    methods: {
      handleAll(list){
        if(list.all){
          this.form[list.input] = list.options.map(item=>{
            return item.id
          })
        }else {
          this.form[list.input] = []
        }
      },
      handleClear(list){
        this.form[list.input] = list.header==='num'?['', '']:list.header==='input'?'':[]
        let filterPanel = this.$refs[list.prop]['0']
        setTimeout(() => {
          filterPanel.showPopper = false
        }, 16);
      },
      handleHeader(column, event){
        if(this.$refs[column.property]){
          let filterPanel = this.$refs[column.property]['0']
          let el = this.$el.querySelector('.'+column.id)
          let rect = el.getBoundingClientRect()
          filterPanel.column = column
          let w = filterPanel.list.header==='num'?289:filterPanel.list.header==='date'?249:filterPanel.list.header==='input'?196:188
          let wf = document.body.clientWidth-rect.left-w-11
          let left = wf<0?rect.left+wf:rect.left
          filterPanel.layout = {top: rect.top+el.offsetHeight+1+'px', left: left+'px'}
          setTimeout(() => {
            filterPanel.showPopper = true;
          }, 16);
        }
      },
      handleRow(row, column, event) {
        if(this.isOpt){
          const rows = JSON.stringify(row)
          if(this.multiple){
            const rowIndex = this.multipleSelection.indexOf(rows)
            if(this.multipleSelection.indexOf(rows)>-1){
              this.multipleSelection.splice(rowIndex, 1)
              this.rowList.splice(rowIndex, 1)
            }else {
              this.multipleSelection.push(rows)
              this.rowList.push(row)
            }
            this.$emit('on-row-click', this.rowList)
          }else {
            if(this.multipleSelection.indexOf(rows)>-1){
              this.multipleSelection = []
              this.rowList = []
              this.$emit('on-row-click', '')
            }else {
              this.multipleSelection = [rows]
              this.$emit('on-row-click', row)
            }
          }
        }else {
          this.$emit('on-row-click', row)
        }
      },
      setMultips(arr){
        this.multipleSelection = []
        this.rowList = [...arr]
        if(arr.length>0){
          this.multipleSelection = arr.map(item=>{
            return JSON.stringify(item)
          })
        }
      },
      handleRowClass({row, rowIndex}){
        if(this.rowClass){
          return this.rowClass({row, rowIndex})
        }else {
          if(this.handle==='edit'){
            if(this.multipleSelection.indexOf(row)>-1){
              return 'curr_row'
            }else {
              return ''
            }
          }else {
            if(this.multipleSelection.indexOf(JSON.stringify(row))>-1){
              return 'curr_row'
            }else {
              return ''
            }
          }
        }
      },
      cellRowMethod({row, column, rowIndex, columnIndex}){
        //{ row, column, rowIndex, columnIndex }
        if (this.cellArry.indexOf(columnIndex)>-1) {
          if (row.cell) {
            return {
              rowspan: row.cell,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      setCurrentRow(row){
        this.$refs['multipleTable'].setCurrentRow(row)
      },
      clearSelection(){
        this.$refs['multipleTable'].clearSelection()
      },
      validate(){
        return new Promise((resolve, reject) => {
          this.$refs['tableForm'].validate((valid)=>{
            if(valid){
              this.myForm = JSON.stringify(this.form)
              this.isChange = false
              resolve(this.isChange)
            }else {
              megError('Please check the filter criteria')
              reject()
            }
          })
        })
      }
    },
    watch: {
      form:{
        handler(newValue) {
          this.isChange = this.myForm !== JSON.stringify(newValue)
        },
        deep: true
      },
      tableData(){
        if(this.isOpt){
          this.multipleSelection = []
          this.rowList = []
          if(this.multiple){
            this.$emit('on-row-click', [])
          }else {
            this.$emit('on-row-click', '')
          }
        }
      },
      isChange(val){
        this.$emit('on-filter-change',val)
      }
    }
  }
</script>
