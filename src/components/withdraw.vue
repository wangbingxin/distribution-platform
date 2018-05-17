<template>
  <el-dialog class="withdraw-popup" title="提现设置" :visible.sync="dialogVisible" @close="close">
    <div class="item">
      <span class="label">可提现金额</span>
      <span class="red content">{{IntToMoney(enable_withdrawal_amount)}}</span>
    </div>
    <div class="item">
      <span class="label">提现金额</span>
      <el-input class="content" v-model="money"></el-input>
    </div>
    <div class="item">
      <span class="label">提现账户</span>
      <div class="bank-card content">
        <img src="../assets/bank.png">
        <div class="text" style="top: 5px; left: 70px">{{cashAccount.bank}}</div>
        <div class="text" style="top: 50px; left: 50px; font-size: 26px;">**** **** *** {{cashAccount.card_number && cashAccount.card_number.slice(-4)}}</div>
        <div class="text" style="top: 90px; left: 50px; font-size: 16px;">{{cashAccount.account_name}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button style="width: 150px" type="primary" @click="withdrawCashes">提 现</el-button>
      <el-button style="width: 150px" @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { IntToMoney } from "../util";
import { setWithdrawCashes, getCashAccount } from "../api";
import { statisticsWithdrawSetting } from "../namespace";
import bus from "../util/bus";

export default {
  props: ["visible"],
  data() {
    return {
      dialogVisible: false,
      money: "",
      enable_withdrawal_amount: window.options.enable_withdrawal_amount,
      cashAccount: {},
      cashAccountStatus: false
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    IntToMoney,
    withdrawCashes() {
      var amount = parseInt(this.money);
      if (isNaN(amount)) {
        this.$message.error("请输入数字");
      } else if (amount > this.enable_withdrawal_amount) {
        this.$message.error("您的最大提现金额为" + this.enable_withdrawal_amount);
      } else if (amount < 20) {
        this.$message.error("单次提现金额不能小于20");
      } else {
        setWithdrawCashes({ amount }).then(r => {
          bus.$emit("update:enable_withdrawal_amount");
        });
        this.dialogVisible = false;
      }
    },
    getCashAccount() {
      return getCashAccount()
        .then(r => {
          this.cashAccountStatus = true;
          this.cashAccount = r;
        })
        .catch(r => {
          this.$emit("update:visible", false);
          this.$message.info("请先设置账户银行信息");
          this.$router.push({ name: statisticsWithdrawSetting.name });
        });
    }
  },
  watch: {
    visible() {
      if (this.visible && !this.cashAccountStatus)
        this.getCashAccount().then(() => {
          this.dialogVisible = this.visible;
        });
    }
  }
};
</script>

<style lang="scss">
.withdraw-popup {
  .el-dialog {
    width: 550px;
    height: 450px;
  }
  .dialog-footer {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
  .item {
    display: flex;
    line-height: 36px;
    margin: 10px 0;
    .label {
      flex-basis: 150px;
    }
    .content {
      overflow: hidden;
      flex: 1;
    }
    .bank-card {
      position: relative;
      .text {
        position: absolute;
        color: #fff;
      }
      img {
        width: 350px;
      }
    }
  }
}
</style>