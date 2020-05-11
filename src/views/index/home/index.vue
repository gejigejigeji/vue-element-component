<template>
  <div class="index-container">
    <div class="index-text">
      welcome Bro
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "index",
    computed: {
      ...mapGetters([
        'name',
        'loading'
      ])
    },
    created() {
      this.loading.all = false
    }
  }
</script>


<style rel="stylesheet/less" lang="less" scoped>
  .app-main{background: #fff;}
  .index-container {position: absolute;width: 100%; top:0;bottom: 0;
    /*background: url("../../../assets/home/greet.png") no-repeat #fff center 270/643*100%;*/
    background: #fff;
    .index-text {position: absolute;top:123/643*100%;text-align: center;width: 100%; font-size: 25px;  line-height: 46px; color: #4080fd;}
  }
</style>
