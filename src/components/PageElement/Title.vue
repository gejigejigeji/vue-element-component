<template>
  <!--tab页面上面操作按钮-->
  <div class="page_title">
    <template v-if="title">
      {{ title }}
    </template>
    <slot ></slot>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: {
      title: {
        type: String,
        default: ''
      },
    }
  }
</script>
