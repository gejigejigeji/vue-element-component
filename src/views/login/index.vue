<style lang="less">
  @import "index.less";
</style>
<template>
  <div class="login_container">
    <div class="login_box">
      <!--<svg-icon class="login_logo" icon-class="logo" />-->
      <el-form class="login_form" autoComplete="on" size="medium" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="top">
        <h1 class="login_title">SCL</h1>
        <el-form-item prop="name" label="username">
          <el-input name="name" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.name" autoComplete="on" placeholder="username" maxlength="50"/>
          <span class="show_pwd" @click="handleUser">
            <svg-icon icon-class="clean"/>
          </span>
        </el-form-item>
        <el-form-item class="forget-item" prop="password" label="password">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    placeholder="password" />
          <span class="show_pwd" @click="showPwd">
            <svg-icon icon-class="password" v-if="pwdIcon==='closed'"/>
            <svg-icon icon-class="eye" v-else/>
          </span>
        </el-form-item>
        <el-button type="primary" class="login_button" :loading="loading" @click.native.prevent="handleLogin">Login</el-button>
      </el-form>
    </div>
    <div class="login_wrapper">
      <div class="login_img">
        <svg-icon class="images" icon-class="login"/>

      </div>
    </div>
  </div>
</template>

<script>
  // panther_liu@wochacha.com admin123
  import { validateEmail } from '@/utils/validate'
  import { megSuc } from '@/utils/notice'
  import { getForget } from '@/api/login'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('Please input the correct email address！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('Password must be at least 6 characters！'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          name: 'panther_liu@wochacha.com',
          password: 'admin123'
        },
        loginRules: {
          name: [{ required: true, trigger: 'blur', }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        pwdIcon: 'closed',
        loading: false,
        showDialog: false,
        dialogVisible: false,
        dialogForm:{email:''},
        dialogLoad: false,
        dialogRules:{
          email: [{ required: true, trigger: 'blur', validator: validateUsername }]
        }
      }
    },
    methods: {
      handleUser(){
        this.loginForm.name = ''
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
          this.pwdIcon = 'open'
        } else {
          this.pwdType = 'password'
          this.pwdIcon = 'closed'
        }
      },
      forget(){
        this.dialogVisible = true
        if (this.$refs['dialogForm']) this.$refs['dialogForm'].resetFields()
      },
      forgetSub(){
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogLoad = true
            getForget(this.dialogForm).then(() => {
              this.dialogLoad = false
              megSuc('申请成功，新密码已发送注册邮箱，请注意查收')
            }).catch(() => {
              this.dialogLoad = false
            })
          } else {
            console.log('表单验证未通过!')
            return false
          }
        })
      },
      handleLogin() {
        console.log(process.env)
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            const data = {
              name: this.loginForm.name,
              password: this.loginForm.password
            }
            this.$store.dispatch('LoginByUsername', data).then(() => {
              this.loading = false
              this.$router.push({ name: 'baseProduct' })
            }).catch(() => {
              console.log('接口错误')
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

