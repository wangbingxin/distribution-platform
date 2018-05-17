<template>
  <el-menu :defaultOpeneds="defaultOpeneds" class="main-menu l" :router='true' :default-active="menuSelectedIndex">
    <div class="menu-status el-menu-item"><img src="../assets/菜单-展开时.png">菜单</div>
    <template v-for="val in menuList">
      <el-submenu v-if="val.children" :key="val.key" :index="val.key">
        <template slot="title">
          <x-svg :icon="val.icon"></x-svg>
          <span>{{val.name}}</span>
        </template>
        <el-menu-item style="padding-left: 105px" v-for="(child,i) in val.children" :index="child.key" :route="child.route" :key="child.key">{{child.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="val.key" :index="val.key" :route="val.route">
        <x-svg :icon="val.icon"></x-svg>
        <span>{{val.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import role from "../jurisdiction";
function activeMenu(index, route) {
  //子路由激活菜单
  if (route.meta.activeMenu) return route.meta.activeMenu;
  else return index;
}
export default {
  data() {
    return {
      menuList: role.menu
    };
  },
  methods: {},
  computed: {
    menuSelectedIndex() {
      if (this.$route.meta.activeMenu) return this.$route.meta.activeMenu;
      else return this.$route.name;
    },
    defaultOpeneds() {
      const arr = [];
      this.menuList.forEach(val => {
        if (val.children) arr.push(val.key);
      });
      return arr;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.main-menu {
  width: 240px;
  background-color: #fff;
  color: #333;
  height: calc(100% - 60px);
  svg {
    margin: 0 20px 0 30px;
    height: 1.2em;
    width: 1.2em;
  }
  .menu-status {
    height: 50px;
    background-color: #fcfcfc;
    img {
      margin: 0 20px 0 30px;
      height: 1.2em;
      width: 1.2em;
      vertical-align: -2px;
    }
  }

  .el-menu-item:not(.menu-status):not(.is-active):hover,
  .el-submenu__title:not(.is-active):hover {
    background-color: #edeef0;
    color: #39a4ff;
  }
  .el-menu-item.is-active {
    color: #fff;
    background: linear-gradient(#39a4ff, #387aff);
  }
  .el-submenu .el-menu {
    background-color: #fff;
  }
}
</style>