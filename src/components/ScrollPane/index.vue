<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const padding = 10 // tag's padding

  export default {
  name: 'scrollPane',
  data() {
    return {
      left: 0
    }
  },
  props: {
    padding: {//按钮是否loading中
      type: Number,
      default: 10
    }
  },
  methods: {
    /*handleScroll(e) {
      console.log(e)
      const type = e.type
      //const eventDelta = e.wheelDelta || -e.deltaY * 20
      let eventDelta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        eventDelta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 20;
      }
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth
      //const padding = 40 // tag's padding
      let left=0

      if (eventDelta > 0) {
        left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            left = this.left
          } else {
            left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          left = 0
        }
      }
      this.left = left
    },*/
    handleScroll (e) {
      const type = e.type
      const delta = e.wheelDelta || -e.deltaY * 20
      //let delta = 0
      //if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        //delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      //}
      const outerWidth = this.$refs.scrollContainer.offsetWidth
      const bodyWidth = this.$refs.scrollWrapper.offsetWidth
      if (delta > 0) {
        this.left = Math.min(0, this.left + delta)
      } else {
        if ((outerWidth-this.padding) < bodyWidth) {
          if (this.left < -(bodyWidth - outerWidth+this.padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + delta, outerWidth - bodyWidth-this.padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      if ($target.offsetLeft < -this.left) {
        // 标签在可视区域左侧
        this.left = -$target.offsetLeft + this.padding
      } else if ($target.offsetLeft + this.padding > -this.left && $target.offsetLeft + $target.offsetWidth < -this.left + this.$refs.scrollContainer.offsetWidth - this.padding) {
        // 标签在可视区域
      } else {
        // 标签在可视区域右侧
        this.left = -($target.offsetLeft - (this.$refs.scrollContainer.offsetWidth - $target.offsetWidth) + this.padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .scroll-container {box-sizing: border-box;
    white-space: nowrap;
    position: relative;
    //overflow: hidden;
    width: 100%;
    &:after{content: "";display: table;clear: both;}
    &:before{content: "";display: table;clear: both;}
    .scroll-wrapper {
      position: absolute;
    }
  }
</style>
