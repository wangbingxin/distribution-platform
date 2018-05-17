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
      <el-button class="full-btn" type="primary" @click="change">修改密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { password } from '../../namespace'
import verificationCode from "../../components/verification-code";
import rules from "./rules";

export default {
  name: password.name,  
  components: {
    "x-verification-code": verificationCode
  },
  data() {
    return {
      form: {
        phone: '',
        sms_code: '',
        password: '',
        repassword: '',
      },
      rules: rules({
        rules: ["phone", "password", "repassword"],
        context: this
      })
    }
  },
  methods: {
    change() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>