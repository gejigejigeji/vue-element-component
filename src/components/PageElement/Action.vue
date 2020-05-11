<template>
  <div class="page_action">
    <slot></slot>
    <MyButton :btn="'reset'" @click="handleReset()" v-if="actions.indexOf('reset')>-1"></MyButton>
    <MyButton :btn="'search'" @click="handleSearch()" v-if="actions.indexOf('search')>-1"></MyButton>
  </div>
</template>

<script>
  export default {
    name: "Action",
    props: {
      actions: {
        type: Array,
        default: () => {
          return ['reset', 'search']
        }
      }
    },
    methods:{
      handleReset(evt) {
        this.$emit('on-reset')
      },
      handleSearch(evt){
        this.$emit('on-search')

      }
    }
  }
</script>
