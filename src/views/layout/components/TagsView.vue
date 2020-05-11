<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :key="tag.path"
                   :to="tag">
        {{tag.title}}
        <span :data-title="tag.title" class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link >
     <!-- <div class="tags-closeTags" v-show="isShow" @click.prevent.stop="closeTags('other')">
        <i class="el-icon-error"></i>
        <span>关闭其他标签</span>
      </div>-->
    </scroll-pane>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane'

  export default {
    components: {ScrollPane},
    data() {
      return {
        visible: true,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      isShow() {
        return this.visitedViews.length>2
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          window.addEventListener('click', this.closeMenu)
        } else {
          window.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.name === this.$route.name) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        if (this.visitedViews.length===1 && view.name==='home') { return false }
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push({
                name: latestView.name,
                query: latestView.query
              })
            } else {
              this.$router.push('/home')
            }
            this.moveToCurrentTag()
          }
        })
      },
      closeTags(command) {
        if (this.visitedViews.length===1 && this.$router.history.current.name==='home') { return false }
        if (command==='all') {
          this.$store.dispatch('delAllViews').then(() => {
            this.$router.push('/home')
            //this.moveToCurrentTag()
          })
        } else {
          this.selectedTag = this.$router.history.current
          this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
            this.$router.push({
              name: this.selectedTag.name,
              query: this.selectedTag.query
            })
            this.moveToCurrentTag()
          })
        }
      }
    }
  }
</script>
