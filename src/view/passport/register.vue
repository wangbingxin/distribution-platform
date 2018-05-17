<template>
  <el-form class="passport-project" label-position="top" :model="form" ref="form" :rules="rules">
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" placeholder="输入手机号码"></el-input>
    </el-form-item>
    <x-verification-code v-model="form.sms_code" ></x-verification-code>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="输入密码（6-20个字符）"></el-input>
    </el-form-item>
    <el-form-item label="再次输入密码" prop="repassword">
      <el-input v-model="form.repassword" type="password" placeholder="输入密码（6-20个字符），并与上边密码相同"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="full-btn" type="primary" @click="register">立即注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { register, login } from "../../namespace";
import rules from "./rules";
import verificationCode from "../../components/verification-code";
import { register as registerAPI } from "../../api";

export default {
  name: register.name,
  components: {
    "x-verification-code": verificationCode
  },
  data() {
    return {
      form: {
        phone: "",
        sms_code: "",
        password: "",
        repassword: ""
      },
      rules: rules({
        rules: ["phone", "password", "repassword"],
        context: this
      })
    };
  },
  methods: {
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let body = new FormData()
          body.append('phone', this.form.phone)
          body.append('sms_code', this.form.sms_code)
          body.append('password', this.form.password)
          body.append('password_repeat', this.form.repassword)
          registerAPI(body).then(r=>{
            this.$router.push({name: login.name})
          })
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>