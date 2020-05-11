<template>
  <div class="menu-wrapper" :class="sidebar.show?'sidebarOpen':''">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="(item.children.length===1 && !item.children[0].children&&!item.alwaysShow)" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}" :disabled="disabled">
          <el-badge :value="item.children[0].meta.backlog" :max="99" :hidden="!item.children[0].meta.backlog||item.children[0].meta.backlog<1">
            <!--<i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="'iconfont icon-'+item.children[0].meta.icon"></i>-->
            <!--<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
            <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </el-badge>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <template v-if="sidebar.show">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" style="margin-right: 5px"></svg-icon>
            <el-badge is-dot :hidden="!item.meta.backlog||item.meta.backlog<1">
              <!--<i v-if="item.meta&&item.meta.icon" :class="'iconfont icon-'+item.meta.icon"></i>-->
              <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
            </el-badge>
          </template>
          <template v-else>
            <el-badge :value="12" class="item" :hidden="!item.meta.backlog||item.meta.backlog<1">
              <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            </el-badge>
          </template>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path" :disabled="disabled"><!--:disabled="disabled" -->
              <el-badge :value="child.meta.backlog" :max="99" :hidden="!child.meta.backlog||child.meta.backlog<1">
                <!--<i v-if="child.meta&&child.meta.icon" :class="'iconfont icon-'+child.meta.icon"></i>-->
                <!--<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
                <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
              </el-badge>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>

  </div>
</template>

<script>
  //import ElScrollbar from 'element-ui/packages/scrollbar/src/main'

  import {mapGetters} from "vuex";

  export default {
    //components: {ElScrollbar},
    name: 'SidebarItem',
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
    },
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

