<template>
  <el-form class="passport-project" label-position="top" :model="form" ref="form" :rules="rules">
    <el-form-item label="旧密码" prop="oldpassword">
      <el-input v-model="form.oldpassword" type="password" placeholder="输入密码（6-20个字符）"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
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
import { password } from "../../namespace";
import rules from "./rules";
import { modifyPassword } from "../../api";

export default {
  name: password.name,
  data() {
    return {
      form: {
        oldpassword: "",
        password: "",
        repassword: ""
      },
      rules: rules({
        rules: ["oldpassword", "password", "repassword"],
        context: this
      })
    };
  },
  methods: {
    change() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let body = new FormData();
          body.append("password", this.form.oldpassword);
          body.append("new_password", this.form.password);
          body.append("new_password_repeat", this.form.repassword);
          modifyPassword(body).catch(r => {});
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>