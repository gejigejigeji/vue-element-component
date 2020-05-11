<template>
  <div class="handle">
    <div class="handle_top">
      <span class="text">{{ type==='add'?'Create':type==='edit'?'Edit':type==='copy'?'Copy':'See' }} Process</span>
    </div>
    <div class="handle_body handle_body_plus">
      <el-form :model="viewForm" :rules="viewRules" ref="viewForm"  label-width="110px" label-position="left">
        <div class="handle_item">

          <el-row>
            <el-col :span="10">
              <el-form-item label="Category:" prop="type">
                <p v-if="isView">{{id.type}}</p>
                <el-select v-else v-model="viewForm.type" clearable  placeholder="Select" >
                  <el-option
                          v-for="a in category"
                          :label="a.value"
                          :value="a.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Process:"  prop="name">
                <p v-if="isView">{{id.name}}</p>
                <el-input v-model="viewForm.name" placeholder="input"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

        </div>


      </el-form>

    </div>
    <div class="handle_footer">
      <el-button type="info" plain @click="backPage()">Cancel</el-button>
      <el-button type="info" @click="handleSave()">Submit</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { megSuc, megError } from '@/utils/notice'
  import { validateInt, validPoint, validateSpace } from '@/utils/validate'

  import {
    createProcess,
    updateProcess,
  } from '@/api/process/index.js'
  export default {
    name: "handleTrackingProcessingLog",
    computed: {
      ...mapGetters([
        'loading',
        'permission',
        'params'
      ]),
      isView(){
        return ['edit'].indexOf(this.type)>-1
      },
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
          type:'',
          name:''
        },
        viewRules: {
          name: [{ required: true, message: 'Please input', trigger: 'change'}],
          type: [{ required: true, message: 'Please input', trigger: 'change'}],
        },
        category: [
          {id:1,value:'CIS'},
          {id:2,value:'LDC'},
          {id:3,value:'COM'},
          {id:4,value:'DIGITAL'},
        ],

      }
    },
    created(){
      const [type, id] = [this.$route.query['type'], this.$route.query['id']];
      this.type = type || '';
      this.id = id || '';
    },
    mounted() {
      const [type, id, page] = [this.$route.query['type'], this.$route.query['id'], this.permission['baseProduct']];
      if (this.isView) {

      }
    },
    methods: {
      addRow() {
        this.viewForm.stages.push('');
      },
      getInfoView(type) {
        this.loading.all = false
      },
      handleSave() {
        this.$refs.viewForm.validate(vali => {
          if (vali) {
            this.loading.all = true;

            // let fun = this.isView ? updateProcess : createProcess;
            let fun = createProcess;
            let id = '';

            let res = this.viewForm;

            fun(res, id).then(res => {
              megSuc('success');
              this.loading.all = false;
              this.backPage('reset');
            }).catch(() => {
              this.loading.all = false
            });
          }
        });
      },
      backPage(type, error) {
        if (error) megError(error);
        this.$store.dispatch('delVisitedViews', {name: 'handleProcess'}).then(() => {
          this.loading.all = false;
          this.$router.push({name: 'baseProcess', params: {type}})
        })
      }
    }
  }
</script>
