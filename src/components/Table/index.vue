<template>
  <!--表格-->
  <el-table ref="multipleTable" :data="tableData" :empty-text="empty" :size="size" border :span-method="cellRowMethod" :max-height="maxHei||tableHeight" @selection-change="handleSelect"
            @row-click="handleRow" :row-class-name="handleRowClass" :column-key="columnKey"><!--highlight-current-row -->
    <template v-for="list in columnData" v-if="!list.hidden">
      <el-table-column type="expand" v-if="list.type&&list.type==='expand'">
        <template slot-scope="scope">
          <slot :name="list.reader" :row="scope.row" v-if="list.reader"></slot>
          <template v-else>
            {{scope.row[list.prop]}}
          </template>
        </template>
      </el-table-column>
      <el-table-column type="selection" :selectable="selectable" :fixed="list.fixed" v-else-if="list.type&&list.type==='selection'"></el-table-column>
      <el-table-column :label="list.label" :type="list.type" :width="list.width||'50'" :fixed="list.fixed" v-else-if="list.type"></el-table-column>
      <el-table-column :label="list.label" :prop="list.prop"  :width="list.width" class-name="handles" :min-width="list.minWidth||'100'" :fixed="list.fixed" v-else-if="list.reader&&list.reader==='handles'"><!--:min-width="list.minWidth+'px'||'100px'" -->
        <template slot-scope="scope">
          <slot :name="list.reader" :row="scope.row" :$index="scope.$index" v-if="list.reader"></slot>
          <template v-else>
            {{scope.row[list.prop]}}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="list.label" :label-class-name="list.required||''" :prop="list.prop"  :width="list.width" :min-width="list.minWidth||'100'" :fixed="list.fixed" v-else><!--:min-width="list.minWidth+'px'||'100px'" -->
        <template slot-scope="scope">
          <slot :name="list.reader" :row="scope.row" :$index="scope.$index" v-if="list.reader"></slot>
          <template v-else>
            {{scope.row[list.prop]}}
          </template>
        </template>
      </el-table-column>
      <!--<el-table-column :type="list.type" :label="list.label" :prop="list.prop"  :width="list.width" :min-width="list.minWidth||'110'" :fixed="list.fixed" v-else></el-table-column>-->
    </template>
  </el-table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'oneTable',
    computed: {
      ...mapGetters([
        'table'
      ]),
      tableHeight(){
        let [ header, tags, tabs, form, pagination, footer ] = [ 52, 36, 72, 27+22, 47, 56]
        return document.body.clientHeight - header - tags - tabs - form - pagination - footer - 9
      }
    },
    props: {
      empty: {
        type: String,
        default: 'Sorry, no data available'
      },
      multiple: {
        type: Boolean,
        default: true
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
      maxHei: {
        type: [String, Number],
        default: ''
      },
      columnKey: {
        type: String,
        default: 'handles'
      },
      selectable: {
        type: Function,
        default: (data)=>{
            //console.log(data)
            return data.status!="CLOSED" && data.status!="DELETED";
        }
      },
      rowClass: {
        type: Function,
        default: ({row, colum}) => {
          // return []
        }
      },
    },
    data() {
      return {
        myCurrent: '',
        multipleSelection: []
      }
    },
    methods: {
      handleSelect(val) {
        this.$emit('on-select',val)
      },
      handleRow(row) {
        if(this.multiple){
          if(this.multipleSelection.indexOf(row)>-1){
            this.multipleSelection.splice(this.multipleSelection.indexOf(row), 1)
          }else {
            this.multipleSelection.push(row)
          }
          this.$emit('on-row-click', this.multipleSelection)
        }else {
          if(this.multipleSelection.indexOf(row)>-1){
            this.multipleSelection = []
            this.$emit('on-row-click', '')
          }else {
            this.multipleSelection = [row]
            this.$emit('on-row-click', row)
          }
        }
      },
      handleRowClass({row, rowIndex}){
        if(this.multipleSelection.indexOf(row)>-1){
          return 'curr_row'
        }else {
          return ''
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
      }
    },
    watch: {
      tableData(){
        this.multipleSelection = []
        if(this.multiple){
          this.$emit('on-row-click', [])
        }else {
          this.$emit('on-row-click', '')
        }
      },
    }
  }
</script>
