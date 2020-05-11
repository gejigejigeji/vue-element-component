<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>您没有权限访问该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:
            <!--<el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>-->
          </li>
          <li class="link-type">
            <a href="/">返回首页</a>
            <!--<router-link to="/">回首页</router-link>-->
          </li>
          <li class="link-type"><span @click.prevent="dialogVisible=true">点我看图</span></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog title="随便看" :visible.sync="dialogVisible">
      <img class="pan-img" :src="ewizardClap">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
//import Layout from '@/views/layout/Layout'
export default {
  name: 'page401',
  //component: Layout,
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/home' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .el-dialog__body img {max-width: 100%;max-height: 100%;}
    .pan-back-btn {
      background: #008489;
      color: #fff;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      /*span {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }*/
    }
  }
</style>
