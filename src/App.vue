<template>
  <div id="app">
    <x-head></x-head>
    <x-menu></x-menu>
    <section class="router-view-wrap r">
      <transition name="el-fade-in">
        <router-view class="router-view"></router-view>
      </transition>
    </section>
  </div>
</template>
<script>
import menu from "./components/menu.vue";
import { serviceNew } from "./namespace";
import role from "./jurisdiction/";
export default {
  name: "app",
  components: {
    "x-menu": menu
  },
 
};
</script>

<style lang="scss">
@import "./base/mixin.scss";
#app {
  height: 100%;
}

.router-view-wrap {
  width: calc(100% - 240px);
  padding: 34px 24px 0 24px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  overflow-y: scroll;
  .router-view {
    background-color: #fff;
    min-height: 100%;
  }
}
</style>
