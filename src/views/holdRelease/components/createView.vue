<template>
  <el-dialog :visible.sync="dialogView" width="900px" custom-class="minDialog" :close-on-click-modal="false">
    <span slot="title">Hold</span>
    <div class="handle pd-0">
      <div class="handle_body handle_body_plus mt-10 ">
        <el-form  label-width="0" label-position="left" :model="form" :rules="rules" ref="viewForm">
          <div class="handle_item pd-b-10">
            <el-row :gutter="16">
              <el-col :span="12">
                <el-table :data="viewData.groups"  border max-height="105px">
                  <el-table-column prop="flow_node_name" label="GC Device"></el-table-column>
                  <el-table-column prop="supplier_name" label="Vendor"></el-table-column>
                  <el-table-column prop="qty" label="wafer Qty"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="reason">
                  <el-input
                          type="textarea"
                          :rows="2"
                          maxlength="120"
                          show-word-limit
                          disabled
                          placeholder="Reason"
                          v-model="form.reason">
                  </el-input>
                </el-form-item>

              </el-col>
            </el-row>
          </div>

          <div class="handle_item mt-20 pd-b-10">
            <h1 class="item_name item_buyer">Detail</h1>
            <el-row :gutter="16">
              <el-col>
                <el-table :data="viewData.wipDetails" border max-height="105px">
                  <el-table-column prop="supplier_name" label="Vendor"></el-table-column>
                  <el-table-column prop="flow_node_name" label="GC Device"></el-table-column>
                  <el-table-column prop="node_version_name" label="GC Version"></el-table-column>
                  <el-table-column prop="lot_no" label="GC Lot ID"></el-table-column>
                  <el-table-column prop="wafer_id" label="Wafer ID"></el-table-column>
                  <el-table-column prop="supplier_stage" label="Vendor Stage"></el-table-column>
                  <el-table-column prop="end_action" label="GC ENG Action"></el-table-column>
                </el-table>
              </el-col>
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
    name: 'holdReleaseCreateView',
    props:[],
    setup(props,ctx) {
      const {root} = ctx;
      let {
        loading
      } = root.$store.getters;

      const state = reactive({
        dialogView:false,
        type:'',
        id:'',
        viewData:{
          groups: [],
          wipDetails: []
        },
        form:{
          reason:''
        },
        rules:{
          reason:[
            {required:true,message:'',trigger:['blur','change']}
          ]
        },
        viewForm:ref(null),
      });

      const getViewList = ({list,type}) => {
        if(!type) return;
        loading.all = true;
        state.type = type;

        getApi(`holdRelease/${type}`).getDetail(list[0].id).then(res => {
          state.viewData = {
            groups:res.data.groups,
            wipDetails:res.data.wip_details
          };
          state.form.reason = res.data.reason;
          loading.all = false;
          state.dialogView = true;
        }).catch(()=>{
          loading.all = false;
        });
      };
      // const handleSpan = ({ row, column, rowIndex, columnIndex }) => {
      //   if (rowIndex == 0 && columnIndex==0) {
      //     return [2,1];
      //   }else if (rowIndex == 1 && columnIndex == 0) {
      //     return [0,0];
      //   }else{
      //     return [1,1];
      //   }
      // };


      return{
        ...toRefs(state),
        getViewList
      }

    }
  }
</script>