<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.show}"  v-loading.fullscreen.lock="loading.all" element-loading-text="loading……">
    <navbar></navbar>
		<sidebar></sidebar>
		<div class="main-container">
      <div class="app-main">
        <app-main></app-main>
      </div>
		</div>
	</div>
</template>

<script>
import {  Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    loading() {
      return this.$store.state.setting.loading
    }
  }
}
</script>
