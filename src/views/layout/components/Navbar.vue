<template>
  <header class="header disPlayFlex " style="">
    <div class="plat-name" >
      Demo
    </div>
    <div class="tags-header flex1 disPlayFlex">
      <tags-view></tags-view>
    </div>
    <div class="headeRight">
      <el-dropdown class="avatar-container" trigger="hover" placement="bottom">
          <span class="avatar-wrapper">
            <svg-icon class="p_user" icon-class="p_user" style="margin-right: 5px"/>
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="avatar-dropdown" slot="dropdown">
            <el-dropdown-item >
              <router-link to="/personal" class="avatar-user">
              <div class="avatar-user">
                <span class="avatar-title"><svg-icon icon-class="avatar"/>account</span>
                <span class="avatar-name"> {{name}} </span>
              </div>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="logout" @click="logout" >
                Sign out
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>

</template>

<script>
import { mapGetters } from 'vuex'
import { megError } from '@/utils/notice'
import TagsView from './TagsView'

export default {
  computed: {
    ...mapGetters([
      'loading',
      'sidebar',
      'name',
      'user_id'
    ])
  },
  components: { TagsView },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideShow')
    },
    logout() {
      this.loading.all = true
      const params = {id: this.user_id}
      console.log(params)
      this.$store.dispatch('LogOut', params).then(() => {
        this.loading.all = false
        this.$router.push({ name: 'login' })
        location.reload()
      }).catch(() => {
        this.loading.all = false
      })
      /*this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })*/
    }
  }
}
</script>
