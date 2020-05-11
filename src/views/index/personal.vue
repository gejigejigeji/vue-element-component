<template>
  <div class="app-container" element-loading-text="loading……">
    <div class="container p-15">
      <MyTitle title="Modify Personal Information"></MyTitle>
      <el-form ref="userForm" :model="userForm" class="pr-10" :rules="dialogRules" label-width="170px">
        <el-form-item label="username：">
          <span v-text="name"></span>
        </el-form-item>
        <el-form-item label="old password：" prop="password">
          <el-input v-model="userForm.password" type="password" placeholder="old password"></el-input>
        </el-form-item>
        <el-form-item label="new password：" prop="newpassword">
          <el-input v-model="userForm.newpassword" type="password" placeholder="new password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm the new password：" prop="newpassword_s">
          <el-input v-model="userForm.newpassword_s" type="password" placeholder="Confirm the new password"></el-input>
        </el-form-item>
        <el-form-item class="mt-5 text-center">
          <el-button size="small" type="primary" @click="submitForm('userForm')">submit</el-button>
          <el-button size="small" @click="resetForm('userForm')">clear</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { personalHandle } from '@/api/index'
  import { megSuc } from '@/utils/notice'

  export default {
    name: 'personal',
    computed: {
      ...mapGetters([
        'loading',
        'name'
      ])
    },
    data() {
      const validatePassNew = (rule, value, callback) => {
        if(value===this.userForm.password) {
          callback(new Error('The new password is the same as the old one'))
        } else {
          callback()
        }
      }
      const validatePassAga = (rule, value, callback) => {
        if (value !== this.userForm.newpassword) {
          callback(new Error('The two passwords are inconsistent'))
        } else {
          callback()
        }
      }
      return {
        userForm: {
          password:'',//新密码
          newpassword:'',//确认新密码
          newpassword_s:'',//旧密码
        },
        dialogRules: {
          password: [
            { required: true, message: 'Please enter the old password'},
            { min: 6, max: 20, message: '6 to 20 characters in length'}
          ],
          newpassword: [
            { required: true, message: 'Please enter a new password'},
            { min: 6, max: 20, message: '6 to 20 characters in length'},
            { required: true, validator: validatePassNew}
          ],
          newpassword_s: [
            { required: true, message: 'Please enter a new password'},
            { min: 6, max: 20, message: '6 to 20 characters in length'},
            { required: true, validator: validatePassAga}
          ],
        },
        subLoading: false
      }
    },
    created() {
      this.loading.all = false
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.all = true
            const tempData = {
              password: this.userForm.password,
              newpassword: this.userForm.newpassword,
              newpassword_s: this.userForm.newpassword_s
            }
            personalHandle(tempData).then(() => {
              this.$router.push({ name: 'home' })
              megSuc('Successful operation!')
            }).catch(() => {
              this.loading.all = false
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
