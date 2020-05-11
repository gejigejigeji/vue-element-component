<template>
  <div class="handle">
    <div class="handle_top">
      <span class="text">{{ type==='add'?'Create':type==='edit'?'Edit':type==='copy'?'Copy':'See' }} Product</span>
      <!--<el-button class="title_btn" type="info" @click="handleOcr()">OCR一键导入</el-button>-->
    </div>
    <div class="step_box">
      <el-steps :active="active" finish-status="success" :process-status="processStatus">
        <el-step :title="item.title" v-for="item in steps"></el-step>
      </el-steps>
    </div>
    <div class="handle_body">
      <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="79px" label-position="top">
        <div class="handle_item">
          <h1 class="item_name item_buyer">Process</h1>
          <el-row :gutter="16">
            <el-col :span="6">
              <el-form-item label="Fab:" prop="purchase_number">
                <p v-if="isView">{{ viewForm.purchase_number }}</p>
                <el-input v-model="viewForm.purchase_number" placeholder="Fab" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="OCF:" prop="purchase_date">
                <p v-if="isView">{{ viewForm.purchase_date }}</p>
                <el-date-picker v-model="viewForm.purchase_date" :picker-options="pickerOptions" type="date" placeholder="OCF" :editable=false value-format="yyyy-MM-dd" style="width: 100%;" v-else></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CSP:">
                <p v-if="isView">{{ viewForm.buyer_remark }}</p>
                <el-input v-model="viewForm.buyer_remark" placeholder="CSP" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="handle_item mt-8">
          <h1 class="item_name">Flow</h1>
          <el-row :gutter="16">
            <el-col :span="6">
              <el-form-item label="CP:" prop="buyer_name">
                <p v-if="isView">{{ viewForm.buyer_name }}</p>
                <el-input v-model="viewForm.buyer_name" placeholder="CP" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row :gutter="8">
                <el-col :span="12">
                  <el-form-item label="Contacts:" prop="seller_address.name" :rules="viewRules.space">
                    <p v-if="isView">{{viewForm.seller_address.name}}</p>
                    <el-input v-model="viewForm.seller_address.name" placeholder="Contacts" v-else></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Tel:" prop="seller_address.tel" :rules="viewRules.space">
                    <p v-if="isView">{{viewForm.seller_address.tel}}</p>
                    <el-input v-model="viewForm.seller_address.tel" placeholder="Tel" :maxlength="params.tel" v-else></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-form>

    </div>
    <div class="handle_footer" v-if="isView">
      <el-button type="info" @click="backPage()">Confirm</el-button>
    </div>
    <div class="handle_footer" v-else>
      <el-button type="info" plain @click="backPage()">Cancel</el-button>
      <el-button type="info" @click="handleSave()">Save</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { megSuc, megError } from '@/utils/notice'
  import { validateInt, validPoint, validateSpace } from '@/utils/validate'

  export default {
    name: "baseProductHandle",
    computed: {
      ...mapGetters([
        'loading',
        'permission',
        'params'
      ]),
      isView(){
        return ['view', 'submitAudit'].indexOf(this.type)>-1
      }
    },
    data() {
      const valSpace = (rule, value, callback) => {
        if (!validateSpace(value)) {
          callback(new Error('Not all spaces'))
        }else {
          callback()
        }
      }
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        active: 0,
        type: '',
        id: '',
        processStatus: 'process',
        steps: [
          {title: 'create'},
          {title: 'submit'},
          {title: 'confirm'}
        ],
        viewForm:{
          purchase_number: '',
          purchase_date: '',
          buyer_remark: '',
          buyer_id: '',
          buyer_name: '',
          buyer_address: {id:'', name: '', tel: '', cites: [], address:'',province: {id: '', name: ''}, city: {id: '', name: ''}, county: {id: '', name: ''}},
          appoint: '1',
          supplier_id: '',
          supplier_com_name: '',
          client_id: '',
          client_com_name:'',
          seller_id: '',
          seller_com_name: '',
          seller_address: {id:'', name: '', tel: '', cites: [], address:'',province: {id: '', name: ''}, city: {id: '', name: ''}, county: {id: '', name: ''}}
        },
        viewRules: {
          purchase_number: [{ required: true, message: 'Please input', trigger: 'blur'},
            { required: true, trigger: 'blur', validator: valSpace}],
          purchase_date: [{ required: true, message: 'Please input', trigger: 'change'}],
          seller_id: [{ required: true, message: 'Please input', trigger: 'change'}],
          space: [{ trigger: 'blur', validator: valSpace}]
        }
      }
    },
    created(){
      const [ type, id ] = [this.$route.query['type'], this.$route.query['id']]
      this.type = type||''
      this.id = id||''
    },
    mounted() {
      const [ type, id, page ] = [this.$route.query['type'], this.$route.query['id'], this.permission['baseProduct']]
      if (type) {
        // const action = page&&page['list']?page['list']:[]
        // if(action.indexOf(type)>-1) {
          this.type = type
          if (type==='add'){
            this.getInfoView('add')//创建
          }else {
            if(id){
              this.id = id
              this.getInfoView(type)//编辑，查看，审核
            }else {
              this.backPage('error','订单ID有误，请返回重新操作')
            }
          }
        // }else {
        //   this.backPage('error','您没有此操作权限，请返回重新操作')
        // }
      }else {
        this.backPage('error','参数有误，请返回重新操作！')
      }
    },
    methods:{
      getInfoView(type){
        this.loading.all = false

      },
      handleSave(){

      },
      backPage(type, error){
        if (error) megError(error)
        this.$store.dispatch('delVisitedViews', {name: 'baseProductHandle'}).then(() => {
          this.loading.all = false
          this.$router.push({ name: 'baseProduct', params: {type}})
        })
      }
    }
  }
</script>
