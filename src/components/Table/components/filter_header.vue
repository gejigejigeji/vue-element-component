<template>
  <transition name="el-zoom-in-top">
    <div class="table_filter" :style="{
        top: layout.top,
        left: layout.left
      }" v-show="showPopper"><!--v-clickoutside="handleOutsideClick" -->
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import Popper from 'element-ui/src/utils/vue-popper';
  import { PopupManager } from 'element-ui/src/utils/popup';
  import Locale from 'element-ui/src/mixins/locale';
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  import Dropdown from './dropdown';

  export default{
    directives: {
      Clickoutside
    },
    // mixins: [Popper, Locale],
    props:{
      placement: {
        type: String,
        default: 'bottom-end'
      },
      list: {
        type: Object,
        default: () => {
          return {}
        }
      }
     },
    data() {
      return {
        showPopper: false
      }
    },
    created() {
      this.layout = { top: '0', left: '0'}
    },
    mounted() {
      this.$parent.$parent.$el.querySelector('.el-table__body-wrapper').addEventListener('scroll', () => {
        setTimeout(() => {
          this.showPopper = false;
        }, 16)
      })
      this.$watch('showPopper', (value) => {
        if (value) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      });
    },
    methods: {
      handleFilterClick(){
        setTimeout(() => {
          this.showPopper = !this.showPopper;
        }, 16);
      },
      handleOutsideClick() {
        setTimeout(() => {
          this.showPopper = false;
        }, 16)
      }
    }
  }
</script>
