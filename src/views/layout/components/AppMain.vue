<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="cachedKey"></router-view>
    </keep-alive>
    <!--<keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>-->
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    cachedKey(){
      //console.log(this.$route)
      return this.$route.name
    }
    /*key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }*/
  }
}
</script>
