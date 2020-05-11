<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <slot name="top"></slot>
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
    <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import Hamburger from '@/components/Hamburger'
const delta = 115

export default {
  name: 'scrollBar',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  props: {
    handletoggleOut: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      top: 0
    }
  },
  methods: {
    /*toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },*/
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 20
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

