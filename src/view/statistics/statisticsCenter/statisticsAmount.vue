<!-- 结算信息 -->
<template>
  <div class="settlement-record">
    <div class="settlement-message view-section view-section-spacing">
      <div v-for="(item, index) in recharge" class='recharge_msg' :key="index">
        <h1>{{item.name}}</h1>
        <p class="red">{{item.money}}</p>
        <el-button v-if="item.operating" @click="handleWithdraw" type="primary">{{item.operating}}</el-button>
        <span v-if="item.withdrawing" style="display: inline-block; position: absolute; right: 50px; top: 52px;">提现中: {{item.withdrawing}}</span>
      </div>
    </div>
    <div class="settlement-order">
      <x-sub-title :item="['结算详情']">
        <span class="blue r" style="font-size: 12px">注：推广期间不扣税</span>
      </x-sub-title>
      <div class="view-section">
        <div class="search-bar">
          <el-date-picker @change="changeDate" v-model="picker_value" type="daterange" placeholder="选择日期范围" style="display: inline-block; width: 300px;" :picker-options="pickerOptions2">
          </el-date-picker>
          <el-button @click="exportBills" type='primary' style='float: right; width: 100px;'>导出</el-button>
        </div>
        <x-table :column="headerList" :data="bills" stripe>
          <template slot="col-5" scope="scope">
            <span class="red">{{scope.rowData.settlement_price}}</span>
          </template>
        </x-table>
        <div class="pagination" v-if="meta.last_page">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>
    <x-withdraw :visible.sync="visible"></x-withdraw>
  </div>
</template>
<script>
import { getBills, exportBills } from "../../../api";
import qs from "qs";
import withdraw from "../../../components/withdraw.vue";
import { statisticsAmount } from "../../../namespace";
import { IntToMoney } from '../../../util'
export default {
  name: statisticsAmount.name,
  components: { "x-withdraw": withdraw },
  data() {
    return {
      picker_value: "",
      // 充值记录列表
      recharge: [
        {
          name: "总充值金额（不含当日）",
          money: IntToMoney(window.options.total_recharge_amount)
        },
        {
          name: "月充值金额（不含当日）",
          money: IntToMoney(window.options.current_month_recharge_amount)
        },
        {
          name: "可提现总余额",
          money: IntToMoney(window.options.enable_withdrawal_amount),
          operating: "提现"
        },
        {
          name: "累计提现金额",
          money: IntToMoney(window.options.accumulative_withdrawal_amount),
          withdrawing: window.weithdraw_pending ? IntToMoney(weithdraw_pending) : 0
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
      input_name: "",
      headerList: [
        {
          label: "结算日期",
          prop: "date"
        },
        {
          label: "充值金额",
          prop: "recharge_amount"
        },
        {
          label: "佣金比例",
          prop: "ratio"
        },
        {
          label: "扣税金额",
          prop: "tax"
        },
        {
          label: "结算后金额",
          prop: "settlement_price"
        }
      ],
      bills: [],
      meta: {},
      visible: false
    };
  },
  methods: {
    // 搜索
    handleIconClick(ev) {
      console.log(ev);
    },
    // 分页
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.getBills(page);
      }
    },
    // 支付状态切换
    handleMenu(item, index) {
      this.active = index;
    },
    // 提现说明
    handleWithdrawMsg() {},
    // 提现
    handleWithdraw() {
      this.visible = true;
    },
    async getBills(page) {
      if (this.picker_value[0]) var start_time = this.picker_value[0].Format();
      if (this.picker_value[1]) var end_time = this.picker_value[1].Format();
      const bills = await getBills({ start_time, end_time, page });
      this.bills = bills.bills;
      this.meta = bills.meta;
    },
    changeDate() {
      this.getBills();
    },
    exportBills() {
      if (this.picker_value[0]) var start_time = this.picker_value[0].Format();
      if (this.picker_value[1]) var end_time = this.picker_value[1].Format();
      var query = qs.stringify({ start_time, end_time });
      const href =
        process.env.NODE_ENV === "development"
          ? "http://channel.wangluogudu.com/api/bills/export"
          : "/api/bills/export";
      exportBills(href + "?" + query);
    }
  },
  async created() {
    const bills = await getBills();
    this.bills = bills.bills;
    this.meta = bills.meta;
  }
};
</script>

<style lang='scss' scoped>
.settlement-message {
  overflow: hidden;
}
.recharge_msg {
  width: calc(25% - 10px);
  float: left;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  background-color: #f7f7f7;
  margin-right: 10px;
  h1 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
    padding: 5px;
  }
  &:nth-child(3) {
    position: relative;
    button {
      position: absolute;
      top: 30px;
      right: 20px;
    }
  }
}
</style>
