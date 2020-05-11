<template>
  <div @click="toggleClick" class="menuTop">
    <svg-icon class="p_menu el-submenu__icon-arrow " icon-class="p_menu"></svg-icon>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'hamburger',
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>
