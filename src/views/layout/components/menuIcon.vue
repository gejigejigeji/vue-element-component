<template>
  <div class="menuIcon">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.show"></hamburger>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: { Hamburger },
    computed: {
      ...mapGetters([
        'sidebar',
        'role'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSidebar')
      },
      toggleShow(){
        this.$store.dispatch('showSidebar')
      }
    }
  }
</script>