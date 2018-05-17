<template>
  <div class="not-found">
    <x-head></x-head>
    <section class="not-found-body">
      <div class="not-found-tip">
        <img class="not-found-img" src="../assets/404.png" alt="">
        <div class="not-found-text">
          <p>出错了...</p>
          <p>建筑物维修中，找不到您请求的网页</p>
        </div>
        <router-link :to="home">
          <el-button class="not-found-button" type="primary">返回首页</el-button>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script>
import { home } from '../namespace'
export default {
  name: "NotFound",
  data() {
    return {
      home:{
        name: home.name
      }
    };
  }
};
</script>
<style scoped lang="scss">
.not-found {
  height: 100%;
}
.not-found-body {
  background-color: #fff;
  margin: 26px auto;
  height: calc(100% - 52px - 60px);
  width: 80%;
  min-width: 720px;
  min-height: 500px;
  display: flex;
}
.not-found-tip {
  position: relative;
  width: 500px;
  height: 325px;
  margin: auto;
}
.not-found-img {
  position: absolute;
  left: 0;
  top: 0;
}
.not-found-text {
  position: absolute;
  right: 0;
  bottom: 30%;
  width: 50%;
  line-height: 3em;
  p:first-child {
    font-size: 24px;
  }
  p:last-child {
    font-size: 14px;
  }
}

.not-found-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  padding: 13px 46px;
}
</style>