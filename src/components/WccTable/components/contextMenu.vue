<template>

  <el-popover
    transition="el-zoom-in-center"
    placement="right"
    width="200"
    trigger="manual"
    v-model="popVisible">
    <div>
<!--      <el-checkbox  v-model="checkGroup.checkAll" >全选</el-checkbox>-->
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkGroup.value" @change="checkChange" class="wcc-table-checkGroup">
        <el-checkbox v-for="(a,i) in keys" :key="i" :label="a">{{a}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="reference" class="wcc-table-rightDown" :style="{left:popPosition.x+'px',top:popPosition.y+'px'}"></span>

  </el-popover>
</template>

<script>
    export default {
      name: "contextMenu",
      props:{
        popPosition:Object,
        keys:Array
      },
      data() {
        return{
          popVisible:false,
          checkGroup: {
            checkAll: false,
            value: [],
          },
        }
      },
      methods: {
        checkChange(val) {
          if (val.length != 0) {
            this.checkGroup.checkAll=true
          }else{
            this.checkGroup.checkAll=false
          }
          this.$emit('active-key',val)
        },
        handlePosition() {
          this.popVisible = false;
          setTimeout(()=>{
            this.popVisible=true
          },100)
        },
        handleCheckAll(val) {
          this.checkGroup.value = val;
        }
      }
    }
</script>

<style scoped>

</style>
