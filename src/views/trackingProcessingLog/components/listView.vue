<template>
  <el-dialog :visible.sync="dialogView" width="700px" custom-class="minDialog" :close-on-click-modal="false">
    <span slot="title">Edit</span>
    <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="93px" label-position="top" size="medium">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="name：" prop="name">
            <p  class="viewParam" v-if="dialogType==='view'">{{viewForm.name}}</p>
            <el-input v-model="viewForm.name" placeholder="name" maxlength="30" v-else></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="code：" prop="code">
            <p  class="viewParam" v-if="dialogType==='view'">{{viewForm.name}}</p>
            <el-input v-model="viewForm.name" placeholder="code" maxlength="30" v-else></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="name：" prop="name">
            <p  class="viewParam" v-if="dialogType==='view'">{{viewForm.name}}</p>
            <el-input v-model="viewForm.name" placeholder="name" maxlength="30" v-else></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="code：" prop="code">
            <p  class="viewParam" v-if="dialogType==='view'">{{viewForm.name}}</p>
            <el-input v-model="viewForm.name" placeholder="code" maxlength="30" v-else></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogView = false">Close</el-button>
      <el-button type="primary" @click="onSub()" v-if="dialogType!=='view'" >Submit</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { validateNum, validPoint } from '@/utils/validate'
  import { megSuc } from '@/utils/notice'

  export default {
    name: 'listView',
    computed: {
      ...mapGetters([
        'loading',
        'props'
      ])
    },
    data() {
      return {
        dialogView: true,
        dialogType: 'add',
        viewForm:{
          name: '',
          code: ''
        },
        viewRules: {
          code: [{ required: true, message: 'Please input', trigger: 'change'}],
          name: [{required: true, message: 'Please input', trigger: 'blur'}]
        }
      }
    },
    methods:{
      getInfoView(type, row){
        if (this.$refs['viewForm']) this.$refs['viewForm'].resetFields()
        this.dialogType = type

        this.dialogView = true
      },
      onSub(){
        this.$refs.viewForm.validate(valid => {
          if(valid){



          }
        })
      }
    }
  }
</script>
