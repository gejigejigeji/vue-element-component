<template>
  <!--操作页面title-->
  <div class="handle_title">{{ title }}
    <el-button-group class="fr" :class="buttonClass">
      <slot ></slot>
    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: "HandleTitle",
    props: {
      title: {
        type: String,
        default: ''
      },
      buttonClass: {
        type: String,
        default: ''
      }
    }
  }
</script>
