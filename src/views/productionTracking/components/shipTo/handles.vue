<template>
  <div class="handle handleShipTo">
    <div class="handle_top">
      <span class="text">Ship To</span>
      <!--<el-button class="title_btn" type="info" @click="handleOcr()">OCR一键导入</el-button>-->
    </div>
    <div class="step_box">
      <el-steps :active="active" finish-status="success" :process-status="processStatus">
        <el-step :title="item.title" v-for="item in steps"></el-step>
      </el-steps>
    </div>
    <div class="handle_body">
      <step1 :shipMains="shipMains"></step1>

<!--      <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="0">-->
<!--        <div :class="['handle_item',index!=0?'mt-20':'']" v-for="(item,index) in shipMains">-->
<!--          <h1 class="item_name item_buyer">{{item.consigner_name}}</h1>-->
<!--          <el-row :gutter="16">-->
<!--            <el-col :span="24" class="mb-15">-->
<!--              <step1 :shipMains="shipMains"></step1>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </el-form>-->

    </div>
    <div class="handle_footer" >
      <el-button type="info" v-if="active==1">Confirm</el-button>
    </div>
    <div class="handle_footer" >
      <el-button type="info" plain >Cancel</el-button>
      <el-button type="info" v-if="active==0">Submit</el-button>
    </div>
  </div>
</template>

<script>
  import { megSuc, megError } from '@/utils/notice'
  import { rangeShortcuts} from '@/utils/picker'
  import step1 from './step1/index'

  import {reactive, toRefs, watch, onMounted,provide} from "@vue/composition-api";
  import {useList, useExcel, useRoute} from "@/views/fn_api/list.js";
  import {
    createShip
  } from "@/api/productionTracking/shipTo/index.js";

  export default {
    name: "handleShipTo",
    props:[],
    components: {step1},
    setup(props,ctx) {
      const {root} = ctx;
      const {
        loading
      } = root.$store.getters;
      loading.all = false;
      const state = reactive({
        active:0,
        steps: [
          {title:'Create'},
          {title:'Confirm'}
        ],
        processStatus: 'process',
        viewForm: {
          value:''
        },
        viewRules:{},
        pickerOptions:rangeShortcuts,
        shipMains: []
      });

      const getViewData = () => {
        createShip().then(res => {
          state.shipMains=res.data.ship_mains;

        });
      };
      getViewData();

      onMounted(() => {

      });

      return{
        ...toRefs(state)
      }

    }
  }
</script>
