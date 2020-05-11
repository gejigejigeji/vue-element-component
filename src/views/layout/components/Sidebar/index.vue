<template>
  <scroll-bar class="sidebar-container"><!-- :handletoggleOut="toggleOut"-->
    <div class="sidebar_top" slot="top" ><menuIcon></menuIcon></div>
    <el-menu mode="vertical" :default-active="$route.path" :default-openeds="pages" :collapse="!sidebar.show"><!-- @select="changeRoute"-->
      <sidebar-item :routes="permission_routers"></sidebar-item>
      <!--:disabled="disabled"-->
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import menuIcon from '../menuIcon'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: {
    menuIcon,
    ScrollBar,
    SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name',
      'pages'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
    }
  },
  methods:{
    /*toggleOut() {
      this.$store.dispatch('outSidebar')
    }
    changeRoute(key, keyPath){
      //console.log(key, keyPath)
      //console.log(this.$route)
      console.log(this.$store.getters.cachedViews)
      this.$store.dispatch('delCachedView', keyPath[0]).then(() => {
        this.$router.push({
          name: this.$route.name,
          query: this.$route.query
        })
        this.$store.dispatch('addVisitedViews', this.$route)
      })
      console.log(this.$store.getters.cachedViews)
    }*/
  }
}
</script>
