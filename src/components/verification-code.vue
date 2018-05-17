<template>
  <el-form-item label="验证码" class="verification-code" :error="error">
    <el-input v-model="code"></el-input>
    <el-button class="verification-code-btn" :disabled="!!effective" type="primary" @click="getCode">{{effective ? `重新获取(${effective})` : '获取验证码' }}</el-button>
  </el-form-item>
</template>
<script>
import { getVerificationCode } from "../api";
import { setCookie, getCookie } from "../util";
const effectiveTime = 2 * 60;

export default {
  name: "verificationCode",
  props: ["value"],
  model: {
    prop: "checked",
    event: "change"
  },
  data() {
    return {
      error: "",
      timer: null,
      effective: 0,
      code: ""
    };
  },
  methods: {
    countdown(second) {
      const end = new Date(+new Date() + 1000 * second);
      this.effective = second;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.effective = Math.round((end - new Date()) / 1000);
        if (this.effective <= 0) {
          clearInterval(this.timer);
          this.effective = 0;
        }
      }, 1000);
    },
    getCode() {
      const phone = this.$parent.fields[0];
      if (this.effective !== 0) return;
      phone.form.validateField("phone");
      if (phone.validateState === "success") {
        getVerificationCode(phone.fieldValue).then(r => {
          this.countdown(effectiveTime);
          setCookie(
            "VerificationCode",
            +new Date(+new Date() + 1000 * effectiveTime),
            effectiveTime *1000
          );
        });
      }
    }
  },
  created() {
    const effectiveTime = getCookie("VerificationCode");
    effectiveTime &&
      this.countdown(Math.ceil((effectiveTime - new Date()) / 1000));
  },
  watch: {
    value(v, o) {
      if (v === this.code) return;
      this.code = v;
    },
    code(v, o) {
      if (v === this.value) return;
      this.$emit("change", v);
    }
  }
};
</script>
<style scoped lang="scss">

</style>