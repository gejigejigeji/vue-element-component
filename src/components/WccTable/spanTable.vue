<template>
  <div v-if="tableData" class="wcc-table" @contextmenu.prevent="contextMenu" @click="handleFocus">

    <contextMenu ref="contextMenu"  :pop-position="popPosition" :keys="contextKeys" @active-key="handleCheck"></contextMenu>

    <el-form ref="form" :model="form" label-width="0" :inline="true">
      <el-table
        ref="table"
        size="small"
        border
        :max-height="maxHeight"
        :row-class-name="rowClass"
        :span-method="arraySpanMethod"
        @row-click="rowClick"
      :data="tableData"
      style="width: 100%">

        <el-table-column type="expand" v-if="expand">
          <template slot-scope="scope">
            <div class="wcc-child-table-container">
              <el-table :data="scope.row[subTable.data_field]"  class="wcc-child-table" border>
                <el-table-column
                        v-for="child in subTable.fields"
                        :key="child.prop+child.header"
                        :width="child.width"
                        :label="child.label">
                  <template slot-scope="scope">
                    <span>
                      <slot :name="child.reader" :data="{row:scope.row,index:scope.$index,meta:child}">{{scope.row[child.prop]}}</slot>
                    </span>

                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>

      <template
        v-for="(item,index) in selectColumn">
        <el-table-column
          :property="item.prop"
          :width="item.width?item.width:''"
          :resizable="false"
          :filters="item.header=='date-range'?[{ text:11, value:22 }]:null"
          align="center"
          :sortable="item.header=='date-range'?true:false"
          sort-by="String"
          :fixed="item.fixed?item.fixed:false">

          <template slot="header" slot-scope="scope">
            <slot v-if="item.reader" :name="'header-'+item.reader" :scope="scope"></slot>
            <div class="wcc-table-header-form">
              <el-popover
                v-if="item.header=='keyword'"
                transition="el-zoom-in-center"
                placement="bottom"
                width="200"
                placeholder="Search"
                trigger="click">
                <div>
                  <el-form-item  class="wcc-table-header-input">
                    <el-input v-model="form[item.reader]"></el-input>
                  </el-form-item>
                </div>
                <p @click="headerClick(item,scope)" slot="reference">{{item.label}} <svg-icon iconClass="b_reset"></svg-icon></p>
              </el-popover>
              <el-popover
                v-else-if="item.header=='date-range'"
                transition="el-zoom-in-center"
                placement="bottom"
                width="230"
                trigger="click">
                <div>
                  <el-form-item  class="wcc-table-header-input">
                    <el-date-picker
                            v-model="form[item.reader]"
                            type="daterange"
                            start-placeholder="Start time"
                            end-placeholder="End time"
                            align="left"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="rangeShortcuts">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <p  @click.self="headerClick(item,scope)" slot="reference">{{item.label}} <svg-icon iconClass="b_reset"></svg-icon></p>
              </el-popover>

              <el-popover
                transition="el-zoom-in-center"
                v-else-if="item.header=='choice'"
                placement="bottom"
                width="200"
                trigger="click">
                <div>
                  <el-form-item  class="wcc-table-header-input">
                    <el-select
                            class="wcc-table-header-select"
                            v-model="form[item.reader]"
                            multiple
                            clearable
                            collapse-tags
                            placeholder="Select">
                      <el-option
                              v-for="item in item.options"
                              :key="item.value+item.name"
                              :label="item.name"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <p @click="headerClick(item,scope)" slot="reference">{{item.label}} <svg-icon iconClass="b_reset"></svg-icon></p>
              </el-popover>

              <el-popover
                transition="el-zoom-in-center"
                v-else-if="item.header=='int'"
                placement="bottom"
                width="210"
                trigger="click">
                <div>
                  <el-form-item  class="wcc-table-relate-input">
                    <el-input v-model="form[item.reader]"></el-input>
                    <span>—</span>
                    <el-input v-model="form[item.reader]"></el-input>
                  </el-form-item>
                </div>
                <p @click="headerClick(item,scope)" slot="reference">{{item.label}} <svg-icon iconClass="b_reset"></svg-icon></p>
              </el-popover>
              <span v-else>{{item.label}}</span>

            </div>

          </template>

          <template  slot-scope="scope">
            <slot :name="item.reader" :data="{row:scope.row,index:scope.$index,meta:item,formatValue:item.options?rowFormatter(scope.row[item.prop],item.options):scope.row[item.prop]}">
              {{item.options?rowFormatter(scope.row[item.prop],item.options):scope.row[item.prop]}}
            </slot>
          </template>
        </el-table-column>

      </template>

    </el-table>
    </el-form>
  </div>
</template>

<script>
  import contextMenu from "./components/contextMenu";
  import{rangeShortcuts,rangePanels} from '@/utils/picker'
  import childTable from './childTable'
    export default {
      name: "span-table",
      components: {contextMenu},
      props:{
        tableData:Array,
        form:Object,
        column:Array,
        subTable:Object,
        refresh:Function,
        expand:{
          type:Boolean,
          default:false
        },
        multipleArr: Array
      },
      compoents: {childTable},
      data() {
        return{
          multiple: [],
          rows: [],
          popVisible:false,
          popPosition: {},
          contextKeys: [],
          selectColumn: [],
          maxHeight:200,
          rangeShortcuts: rangeShortcuts,
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
      },
      created() {
        let height = window.innerHeight-50-42-52-50;
        this.maxHeight = height;
      },
      mounted() {
        this.contextKeys = this.$props.column.map(a => {
          return a.label
        });
        this.selectColumn = JSON.parse(JSON.stringify(this.$props.column));
        this.$refs.contextMenu.handleCheckAll(this.contextKeys);
        // let spanNum = this.computedData(this.tableData);
        // this.rowSpan=spanNum.rowSpan;
        // this.columnArr=spanNum.columnArr
      },
      methods: {
        computedData(data) {
          let keys = [];
          let rowSpan = [];
          let arr = [];
          data.map((a,b) => {
            if (keys.length == 0) {
              keys.push(a.name);
              rowSpan.push(b)
            }else{
              if (keys.indexOf(a.name) <0) {
                keys.push(a.name);
                rowSpan.push(b)
              }
            }
            arr=[...arr,a.name];
          });
          arr = [...new Set([...arr])];
          let values = {};
          data.map(a => {
            if (arr.indexOf(a.name) >= 0) {
              if(values[a.name]){
                values[a.name].push(a.hair);
              }else{
                values[a.name]=[a.hair]
              }
            }
          });
          let columnArr = [];
          for(let a in values) {
            columnArr.push(values[a].length);
          }
          return{
            rowSpan,
            columnArr
          }
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          if ([0,3,4,5,6].indexOf(columnIndex) > -1) {
            if (row.cell) {
              return{
                rowspan:row.cell,
                colspan:1
              }
            }else{
              return{
                rowspan:0,
                colspan:0
              }
            }
          }
        },
        rowFormatter(val, options) {
          let name = '';
          options.map(a => {
            if (a.value == val) {
              name = a.name;
            }
          });
          return name;
        },
        contextMenu(e) {
          let sliderState = this.$store.getters.sidebar.show;
          let x = e.screenX;
          let y = e.screenY-210;
          if (sliderState==true) {
            x=x-210
          }else{
            x=x-60
          }
          this.popPosition = {x,y};
          this.$refs.contextMenu.handlePosition();

        },
        handleFocus() {
          this.$refs.contextMenu.popVisible=false;
        },
        rowClass({row,rowIndex}) {
          let rows = this.rows;
          if (rows.length == 0) {
            return ''
          }else{
            if (rows.indexOf(JSON.stringify(row)) >= 0) {
              return 'currRow';
            }else{
              return '';
            }
          }
        },
        setRowClass() {
          this.rows = [];
          // this.rowClass();
        },
        rowClick(row, column, event) {
          let r = JSON.stringify(row);
          let rows = this.rows;
          if (rows.indexOf(r) < 0) {
            rows.push(r);
          }else{
            const index = rows.indexOf(r);
            if (index >= 0) {
              rows.splice(index, 1);
            }
          }
          this.multiple = rows.map(a => {
            return JSON.parse(a);
          });
          this.$emit('on-multiple',this.multiple)
          // this.tableData=this.tableData
          // this.refresh()
        },
        headerClick(a,b) {
          console.log(this.form)
        },
        handleCheck(keys) {
          let column = this.$props.column.filter(a => {
            if (keys.indexOf(a.label) >= 0) {
              return true
            }
          });
          this.selectColumn = [];
          this.$nextTick(() => {
            this.selectColumn=column
          });
        }
      }
    }
</script>

