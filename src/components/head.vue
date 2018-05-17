<template>
  <header>
    <h1 class="logo l">
      <router-link :to="home"> <img src="../assets/logo.png" alt="阅读云联盟"> </router-link>
    </h1>
    <div class="service-prompt" v-if="isSubscription">
      <router-link :to="serviceNew">
        <el-button type="danger">未设置</el-button>
      </router-link>
      如为服务号合作，请
      <router-link class="red" :to="serviceNew">开始设置</router-link>
    </div>
    <div v-if="id" class="user r" @click.stop="extraBOX(!extra)">
      <p class="info">
        <img style="height: 1em;margin-right: 10px" src="../assets/rentou.png"> ID：{{id}}
        <img style="height: .6em;margin-left: 5px" src="../assets/san.png">
      </p>
      <transition name="el-fade-in">
        <ul class="extra" v-if="extra">
          <!-- <li>
                        <img src="../assets/个人资料.png">
                        <span>个人资料</span>
                      </li> -->
          <li>
            <router-link :to="password">
              <img src="../assets/修改密码.png">
              <span>修改密码</span>
            </router-link>
          </li>
          <li>
            <a href="/logout">
              <img src="../assets/安全退出.png">
              <span>安全退出</span>
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </header>
</template>

<script>
let fn = null;
import { password, home, serviceNew } from "../namespace";
import role from "../jurisdiction";
export default {
  name: "head",
  data() {
    return {
      extra: false,
      id: options ? options.distribution_channel_id : "",
      password: {
        name: password.name
      },
      home: {
        name: home.name
      },
      serviceNew: {
        name: serviceNew.name
      },
      isSubscription : role.role === 'subscription'
    };
  },
  methods: {
    extraBOX(status = true) {
      this.extra = status;
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      (fn = e => {
        this.extraBOX(false);
      })
    );
  },
  destroyed() {
    document.removeEventListener("click", fn);
    fn = null;
  },
  install(Vue) {
    Vue.component("x-head", this);
  }
};
</script>

<style lang="scss" scoped>
@import "../base/mixin.scss";
header {
  background-color: #272b2f;
  height: 60px;
}

.logo {
  margin: 12px 60px;
  img {
    display: block;
  }
  color: #fff;
}

.user {
  margin-right: 24px;
  width: 160px;
  position: relative;
  .info {
    @include text-center(60px, 16px);
    color: #fff;
    cursor: pointer;
  }
  .extra {
    width: 140px;
    position: absolute;
    right: 0;
    top: 60px;
    background-color: rgba(#000, 0.7);
    padding: 6px 0;
    z-index: 1;
    li {
      cursor: pointer;
      img {
        vertical-align: -4px;
        margin-right: 26px;
      }
      @include text-center(30px, 14px);
      a {
        color: #fff;
      }
    }
  }
}
.service-prompt {
  color: #fff;
  position: absolute;
  left: 300px;
  top: 16px;
  .el-button {
    padding: 6px 15px;
    margin-right: 1em;
    background-color: $red;
    border-color: $red
  }
}
</style>