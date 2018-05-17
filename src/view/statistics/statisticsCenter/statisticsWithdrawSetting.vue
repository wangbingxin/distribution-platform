<!-- 提现设置 -->
<template>
  <div class="withdraw_setup view-section">
    <div class="con_left" style="float: left; width: 49%">
      <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
        <el-form-item label="姓名" prop="account_name">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-xingming"></x-svg>
            <span>姓名</span>
          </template>
          <el-input :disabled="status" v-model="ruleForm.account_name"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="identity_card">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-shenfenzheng"></x-svg>
            <span>身份证</span>
          </template>
          <el-input :disabled="status" v-model="ruleForm.identity_card"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="card_number">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-yinhangqia"></x-svg>
            <span>银行卡号</span>
          </template>
          <el-input :disabled="status" @input="format_card_number" v-model="ruleForm.card_number"></el-input>
        </el-form-item>
        <el-form-item label="交易银行" prop="account_bank">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-jiaoyiyinhang"></x-svg>
            <span>交易银行</span>
          </template>
          <el-input :disabled="status" v-model="ruleForm.account_bank"></el-input>
        </el-form-item>
        <el-form-item label="所在地" prop="province">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-suozaidi"></x-svg>
            <span>所在地</span>
          </template>
          <el-input v-if="status" :disabled="status" v-model="ruleForm.province"></el-input>
          <el-cascader v-else style="width: 100%" v-model="ruleForm.province" :options="cities" :show-all-levels="false" expand-trigger="hover" placeholder="可输入关键字搜索" filterable></el-cascader>
        </el-form-item>
        <el-form-item label="开户支行" prop="bank">
          <template slot="label">
            <x-svg style="padding-right: .5em" icon="#icon-zhihang"></x-svg>
            <span>开户支行</span>
          </template>
          <el-input :disabled="status" v-model="ruleForm.bank"></el-input>
        </el-form-item>
        <el-form-item v-if="!status">
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="sendStatus">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="con_right" style="float: right; width: 49%">
      <div class="example" v-if="!status">
        <h1 class="example-title">示例：</h1>
        <div class="example-wrap">
          <p class="example-item">
            <span class="label">姓名</span>
            <span>张老三</span>
          </p>
          <p class="example-item">
            <span class="label">身份证</span>
            <span>123456789123456</span>
          </p>
          <p class="example-item">
            <span class="label">银行卡号</span>
            <span>123456789</span>
          </p>
          <p class="example-item">
            <span class="label">交易银行</span>
            <span>杭州银行</span>
          </p>
          <p class="example-item">
            <span class="label">所在地</span>
            <span>杭州</span>
          </p>
          <p class="example-item">
            <span class="label">开户支行</span>
            <span>钱江支行</span>
          </p>
        </div>
      </div>
      <div class="example">
        <h1 class="example-title">注意：</h1>
        <div class="example-wrap">
          <p class="example-item red">
            1，保存后，不可修改，如需修改请联系客服
          </p>
          <p class="example-item red">
            2，身份证、银行卡的持有人必须与姓名一致
          </p>
          <p class="example-item red">
            3，不支持多个头条号使用同一个身份证和银行卡提现
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getCashAccount, setCashAccount, getCity } from "../../../api";
import { statisticsWithdrawSetting } from "../../../namespace";
import { luhnCheck, IDCheck } from "../../../util";

export default {
  name: statisticsWithdrawSetting.name,
  data() {
    return {
      ruleForm: {
        account_name: "",
        identity_card: "",
        card_number: "",
        account_bank: "",
        province: [],
        bank: ""
      },
      rules: {
        account_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        identity_card: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { validator: IDCheck, trigger: "blur" }
        ],
        card_number: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          {
            pattern: /(^(\d{4}\s){3}\d{4}$)|(^(\d{4}\s){4}\d{1,3})$/,
            message: "银行卡只能是16-19位",
            trigger: "blur"
          },
          { validator: luhnCheck, trigger: "blur" }
        ],
        account_bank: [{ required: true, message: "请输入交易银行", trigger: "blur" }],
        province: [
          // { required: true, message: "请输入所在地", trigger: "blur",type:"array" },
          {
            validator(rule, value, callback) {
              if (value.length) {
                callback();
              } else {
                callback(new Error("请输入所在地"));
              }
            },
            trigger: "blur"
          }
        ],
        bank: [{ required: true, message: "请输入开户支行", trigger: "blur" }]
      },
      cities: [
        {
          value: "加载中",
          label: "加载中",
          disabled: true
        }
      ],
      status: false,
      sendStatus: false
    };
  },
  methods: {
    submitForm(formName) {
      if (this.sendStatus) return;
      else this.sendStatus = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          setCashAccount({
            account_name: this.ruleForm.account_name,
            identity_card: this.ruleForm.identity_card,
            card_number: this.ruleForm.card_number.replace(/\s/g, ""),
            account_bank: this.ruleForm.account_bank,
            province: this.ruleForm.province[this.ruleForm.province.length - 1],
            bank: this.ruleForm.bank
          })
            .then(r => {
              this.ruleForm.province = this.ruleForm.province[
                this.ruleForm.province.length - 1
              ];
              this.status = true;
            })
            .catch(e => {
              this.sendStatus = false;
            });
        } else {
          this.sendStatus = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    format_card_number() {
      this.ruleForm.card_number = this.ruleForm.card_number
        .replace(/\D/g, "")
        .replace(/....(?!$)/g, "$& ");
    }
  },
  mounted() {
    let loadingInstance = this.$loading({
      target: this.$refs.ruleForm.$el
    });
    getCashAccount()
      .then(r => {
        this.ruleForm = r;
        this.status = true;
        loadingInstance.close();
      })
      .catch(e => {
        loadingInstance.close();
        getCity().then(r => {
          this.cities = r;
        });
      });
  }
};
</script>
<style lang="scss" scoped>
.example {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  .example-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .example-wrap {
    color: #999;
    background-color: #f7f7f7;
    padding: 26px;
    .example-item {
      display: flex;
      line-height: 30px;
      .label {
        flex-basis: 80px;
      }
    }
  }
}
</style>
