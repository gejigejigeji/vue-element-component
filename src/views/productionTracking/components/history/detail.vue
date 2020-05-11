<template>
  <el-dialog :visible.sync="dialogView" width="480px"  custom-class="scroll-dialog" :close-on-click-modal="false">
    <span slot="title">Wip Detail</span>
    <div class="handle pd-0">
      <div class="handle_body handle_body_plus ">
        <el-form  label-width="150px" label-position="left">

          <div class="handle_item  pd-b-10">
            <el-row class="mt-20">
              <el-row class="mt-20">
                <el-col>
                  <el-form-item label="Process：" class="dialogList">
                    <span>{{detailData.process_name}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Vendor：" class="dialogList">
                    <span>{{detailData.supplier_name}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC_PO：" class="dialogList">
                    <span>{{detailData.po}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="WO NO：" class="dialogList">
                    <span>{{detailData.wo}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Vendor File：" class="dialogList">
                    <a :href="detailData.vender_file">
                      <i class="el-icon-upload"></i>
                    </a>
                    <!--                  <span>{{detailData.vender_file}}</span>-->
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC Device：" class="dialogList">
                    <span>{{detailData.flow_node_name}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC Version：" class="dialogList">
                    <span>{{detailData.node_version_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC Lot ID：" class="dialogList">
                    <span>{{detailData.lot_no}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Wafer ID：" class="dialogList">
                    <span>{{detailData.wafer_id }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC Stage：" class="dialogList">
                    <span>{{detailData.stage_name}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Vendor Stage：" class="dialogList">
                    <span>{{detailData.supplier_stage }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC_Status：" class="dialogList">
                    <span>{{detailData.lot_status }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Lot Type：" class="dialogList">
                    <span>{{detailData.lot_type }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Current Wafer Qty：" class="dialogList">
                    <span>{{detailData.current_wafer_qty }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Gross Die：" class="dialogList">
                    <span>{{detailData.gross_die}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Good Die：" class="dialogList">
                    <span>{{detailData.good_die_qty}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC Grade：" class="dialogList">
                    <span>{{detailData.grade}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Total Layer：" class="dialogList">
                    <span>{{detailData.total_layer }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Remain Layer：" class="dialogList">
                    <span>{{detailData.remain_layer }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Flow：" class="dialogList">
                    <span>{{detailData.supplier_flow }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="GC ENG Action：" class="dialogList">
                    <span>{{detailData.end_action }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Vendor_Hold_Reason：" class="dialogList">
                    <span>{{detailData.supplier_hold_reason }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Remark：" class="dialogList">
                    <span>{{detailData.supplier_remark }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Receive Date：" class="dialogList">
                    <span>{{detailData.supplier_receive_date }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="Wafer Start Date：" class="dialogList">
                    <span>{{detailData.supplier_start_date }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-row>
          </div>
        </el-form>

      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogView = false">Close</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { megSuc } from '@/utils/notice'
  import {reactive, toRefs, watch, onMounted, ref} from "@vue/composition-api";
  import {getApi} from '@/views/fn_api/utils/require.js'

  export default {
    name: 'detailView.vue',
    props:[],
    setup(props,ctx) {
      const {root} = ctx;
      let {
        loading
      } = root.$store.getters;
      const state = reactive({
        dialogView:false,
        detailData:[]
      });

      const getViewList = ({row,path}) => {
        loading.all = true;
        let id = row.id;
        getApi(`productionTracking/${path}`).getDetail(id).then(res => {
          state.detailData = res.data;
          state.dialogView = true;
          loading.all = false;
        }).catch(() => {
          loading.all = false;
        });
      };

      const handleSpan = ({ row, column, rowIndex, columnIndex }) => {
        if (rowIndex == 0 && columnIndex==0) {
          return [2,1];
        }else if (rowIndex == 1 && columnIndex == 0) {
          return [0,0];
        }else{
          return [1,1];
        }
      };

      const handleSave = () => {

      };

      return{
        ...toRefs(state),
        handleSpan,
        handleSave,
        getViewList,
      }

    }
  }
</script>