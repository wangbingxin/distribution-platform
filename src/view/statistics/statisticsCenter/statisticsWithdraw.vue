<!-- 提现信息 -->
<template>
  <div class="message">
    <div class="pagination p_msg view-section-spacing">
      <div v-for="(item, index) in recharge" class='withdraw_msg' :key="index">
        <h1 :class="{noinfo:item.date}">{{item.name}}</h1>
        <p class="red">{{IntToMoney(item.money)}}</p>
        <el-button type='primary' v-if="item.operating" @click="handleWithdraw">{{item.operating}}</el-button>
        <span style="color: #999" v-if="'date' in item">日期： {{item.date ? item.date : ' —'}}</span>
        <span style="color: #999" v-if="'money_total' in item">总金额：{{IntToMoney(item.money_total)}}</span>
      </div>
    </div>
    <div class="msg">
      <div class='sub-title'>
        <span v-for="(item, index) in payStatus" :key="index" :class="{active: active == index}" @click='handleMenu(item, index)'>{{item.text}}</span>
        <!-- <el-button type="text" style="float: right; margin:9px 26px 0 0;" @click='handleWithdrawMsg'>提现说明</el-button> -->
      </div>
      <div class="pagination">
        <el-date-picker @change="getWithdrawCashes(undefined)" v-model="value7" type="daterange" placeholder="选择日期范围" style="display: inline-block; width: 300px;" :picker-options="pickerOptions2">
        </el-date-picker>
        <div class="header" style="margin-top: 26px;">
          <x-table :column="headerList" :data="tableData" stripe>
            <template slot="col-4" scope="scope">
              <span :style="{color: scope.rowData.color}">{{scope.rowData.label}}</span>
            </template>
          </x-table>
          <div class="pagination" v-if="meta.last_page">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <x-withdraw :visible.sync="visible"></x-withdraw>
  </div>
</template>
<script>
import { IntToMoney } from "../../../util/index";
import { getWithdrawCashes } from "../../../api";
import withdraw from "../../../components/withdraw.vue";
import { statisticsWithdraw } from "../../../namespace";

export default {
  name: statisticsWithdraw.name,
  components: { "x-withdraw": withdraw },
  data() {
    return {
      // 充值记录列表
      recharge: [
        {
          name: "最近一笔提现",
          money: window.options.latest_withdrawal_amount,
          date: window.options.latest_withdraw_time
        },
        {
          name: "可提现金额",
          money: window.options.enable_withdrawal_amount,
          money_total: window.options.total_recharge_amount,
          operating: "提现"
        },
        {
          name: "累计提现金额",
          money: window.options.accumulative_withdrawal_amount
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      active: 0, // 按钮切换状态
      headerList: [
        {
          label: "打款时间",
          prop: "pay_time"
        },
        {
          label: "提现金额",
          prop: "withdraw_amount"
        },
        {
          label: "打款金额(税后)",
          prop: "pay_amount"
        },
        {
          label: "打款状态",
          prop: "status"
        }
      ],
      tableData: [],
      payStatus: [
        //1-待审核、2-打款中、3-已打款、4-被冻结(移除)、5-打款失败.
        {
          text: "全部"
        },
        {
          text: "待审核",
          color: "#ffd43f",
          status: 1
        },
        {
          text: "打款中",
          color: "#999999",
          status: 2
        },
        {
          text: "已打款",
          color: "#3def91",
          status: 3
        },
        {
          text: "打款失败",
          color: "#ff5d5d",
          status: 5
        }
      ],
      meta: {},
      value7: "",
      flag: true,
      visible: false //提现窗口
    };
  },
  methods: {
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.getWithdrawCashes(page);
      }
    },
    // 支付状态切换
    handleMenu(item, index) {
      this.active = index;
      this.value7 = "";
      this.getWithdrawCashes();
    },
    // 提现说明
    handleWithdrawMsg() {},
    // 提现
    handleWithdraw() {
      this.visible = true;
    },
    async getWithdrawCashes(page) {
      if (this.value7[0]) var start_time = this.value7[0].Format();
      if (this.value7[1]) var end_time = this.value7[1].Format();
      if (this.active) var status = this.active;
      const r = await getWithdrawCashes({ start_time, end_time, page, status });
      r.withdraw_cashes.forEach(this.addStatus);
      this.tableData = r.withdraw_cashes;
      this.meta = r.meta;
    },
    addStatus(order) {
      //增加订单状态和颜色
      const defaultValue = this.payStatus.find(val => {
        return val.status === order.status;
      });
      order.color = defaultValue.color;
      order.label = defaultValue.text;
    },
    IntToMoney: IntToMoney
  },
  created(to, from, next) {
    this.getWithdrawCashes();
  }
};
</script>
<style lang='scss' scoped>
.withdraw_msg {
  background-color: #f5f6f7;
  box-sizing: border-box;
  margin: 5px 5px;
  width: calc(33.3% - 10px);
  padding: 20px;
  height: 116px;
  float: left;
  h1 {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 16px;
    font-weight: 700;
    line-height: 2.5em;
  }
  &:nth-child(2) {
    position: relative;
    button {
      position: absolute;
      width: 90px;
      height: 30px;
      line-height: 11px;
      right: 60px;
      top: 40px;
    }
  }
  &:nth-child(3) {
    h1 {
      margin-bottom: 20px;
    }
  }
}
</style>
