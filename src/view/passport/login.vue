<template>
  <el-form class="passport-project" label-position="top" :model="form" ref="form" :rules="rules">
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" placeholder="输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input @keyup.enter.native="login" v-model="form.password" type="password" placeholder="输入密码（6-20个字符）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="full-btn" type="primary" @click="login">登录</el-button>
    </el-form-item>
    <!-- <div class="passport-tip">
            忘记号码，手机号
            <router-link class="blue" :to="password">找回密码</router-link>
          </div> -->
    <div class="passport-tip">
      没有帐号？立即
      <router-link class="blue" :to="register">注册帐号</router-link>
    </div>
  </el-form>
</template>

<script>
import { login, password, register } from "../../namespace";
import rules from "./rules";
import { login as loginAPI } from "../../api";

export default {
  name: login.name,
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      rules: rules({
        rules: ["phone", "password"],
        context: this
      }),
      password: {
        name: password.name
      },
      register: {
        name: register.name
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let body = new FormData();
          body.append("phone", this.form.phone);
          body.append("password", this.form.password);
          loginAPI(body).then(r => {
            location.href = "/";
          });
        }
      });
    }
  },
  mounted() {
    //qq浏览器填充有问题
    setTimeout(() => {
      Array.from(
        this.$refs.form.$el.querySelectorAll(".el-input__inner")
      ).forEach((val, i) => {
        if (i === 0 && val.value !== this.form.phone) {
          this.form.phone = val.value;
        }
        if (i === 1 && val.value !== this.form.password) {
          this.form.password = val.value;
        }
      });
    }, 200);
  }
};
</script>

<style lang="scss" scoped>

</style>