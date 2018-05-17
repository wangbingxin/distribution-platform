<template>
  <div class="passport">
    <x-head :person="false"></x-head>
    <div class="passport-body">
      <div class="title">{{$route.meta.Chinese}}</div>
      <div class="passport-project-wrap">
        <router-view class="passport-project"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { passport } from "../../namespace";

export default {
  name: passport.name,
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.passport-body {
  width: 800px;
  margin: 26px auto;
}

.passport-project-wrap {
  background: #fff;
  min-height: 80vh;
  overflow: hidden;
}

.passport-project {
  width: 400px;
  margin: 100px auto;
}

// .passport-tip {
//   font-size: 14px;
//   color: #999999;
//   text-align: right;
// }

.full-btn {
  display: block;
  width: 100%;
}

.verification-code {
  .el-input {
    float: left;
    width: calc(100% - 140px)
  }
  .verification-code-btn {
    float: right;
    width: 120px;
  }
}
</style>