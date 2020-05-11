<template>
  <div class="app-index">
    <Index></Index>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Index from './home/index'

export default {
  name: 'home',
  components: { Index },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'loading'
    ])
  },
  created() {
    this.loading.all = false
  }
}
</script>

<style lang="less">
  /*.app-container{padding: 0;}*/
</style>
