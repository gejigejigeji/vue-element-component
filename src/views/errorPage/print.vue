<template>
  <!--<el-scrollbar  class="testBox" style="height: 200px;">-->
    <div class="printDiv">
      <h1>出库单</h1>
      <div class="p-form">
        <div class="p-form-item p-col">
          <label class="p-form-item__label">收货公司:</label>
          <div class="p-form-item__content">小天鹅集团</div>
        </div>
        <div class="p-form-item p-col">
          <label class="p-form-item__label">收货人:</label>
          <div class="p-form-item__content">小天鹅集团</div>
        </div>
        <div class="p-form-item">
          <label class="p-form-item__label">收货电话:</label>
          <div class="p-form-item__content">123132123</div>
        </div>
        <div class="p-form-item">
          <label class="p-form-item__label">终端收货地址:</label>
          <div class="p-form-item__content">北京北京市东城区12323</div>
        </div>
        <div class="p-form-item p-col">
          <label class="p-form-item__label">物流公司:</label>
          <div class="p-form-item__content">小天鹅集团</div>
        </div>
        <div class="p-form-item p-col">
          <label class="p-form-item__label">物流单号:</label>
          <div class="p-form-item__content">123123213</div>
        </div>
        <div class="p-form-item p-col">
          <label class="p-form-item__label">出库单号:</label>
          <div class="p-form-item__content">123123123</div>
        </div>
        <div class="p-form-item p-col">
          <label class="p-form-item__label">出库日期:</label>
          <div class="p-form-item__content">2018-08-24</div>
        </div>
        <div class="p-form-item">
          <label class="p-form-item__label">出库总数量:</label>
          <div class="p-form-item__content">123132123</div>
        </div>
      </div>
      <table class="p-table">
        <thead>
        <tr class="">
          <td>终端订单号</td>
          <td>终端项目编号</td>
          <td>终端物料编码</td>
          <td>终端物料描述</td>
          <td>成品类型</td>
          <td>成品供应商物料编码</td>
          <td>发货数量</td>
          <td>备注</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
          <td>dsfsfsfdsf</td>
        </tr>
        </tbody>
      </table>
    </div>
  <!--</el-scrollbar>-->

</template>

<script>
  //import ElScrollbar from 'element-ui/packages/scrollbar/src/main'

  export default {
    //components: { ElScrollbar },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar',
        'name'
        //'visitedViews'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style type="text/css">
  html,body,table,div{padding: 0;background: #fff;margin: 0 auto;outline: 0;font-weight: inherit;font-style: inherit;font-size: 100%;border: none;outline: none; font-family: inherit;
    text-size-adjust:100% !important;  -ms-text-size-adjust:100%; line-height:1;}
  body{font-family: 'Microsoft YaHei','微软雅黑', 'simsun', sans-serif;font-size: 12px;color: #606266;}
  .printDiv{padding: 7px;}
  h1{text-align: center;font-size: 20px;}
  /*.pr{padding-right: 8px;}*/
  /*.pl{padding-left: 8px;}*/
  .testBox{max-height: 200px;overflow: auto;}
  .p-form{position: relative;box-sizing: border-box;font-size: 0;}
  .p-form:before,.p-form:after,.p-form-item:before,.p-form-item:after{content: ""; clear: both;display: table;}
  .p-form:after,.p-form-item:after{clear: both;}
  .p-form .p-col{float: left;width: 50%;box-sizing: border-box;}
  .p-form-item{line-height: 28px;font-size: 13px;padding: 0 7px 10px 7px;}
  .p-form-item__label{float: left;font-weight: normal; vertical-align: middle;padding: 0 7px 0 0;box-sizing: border-box;color: #36373C;white-space: nowrap;min-width: 100px;text-align: left;}
  .p-form-item__content{margin-left: 100px;line-height: 28px;}
  .p-table{width: 100%;max-width: 100%;border-collapse: separate;border-spacing:0; }
  .p-table thead{white-space: nowrap;background: #F9FAFB;}
  .p-table td{border: 1px solid #f2f5f8;line-height: 16px;border-collapse:collapse;}
  .p-table thead td{color: #5D5D70;padding: 13px 10px;}
  .p-table tbody td{color: #646b77;white-space: normal;padding: 10px 7px;}
</style>