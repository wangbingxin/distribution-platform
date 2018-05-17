<!-- 充值记录 -->
<template>
  <div class="recharge_record">
    <div class='title'>充值记录</div>
    <div class="recharge-message view-section view-section-spacing">
      <div v-for="(item, index) in recharge" class='recharge_msg' :key="index">
        <h1 style="font-size: 16px; font-weight: 700;">{{item.name}}</h1>
        <p style="color: #ff5b59; font-size: 16px; font-weight: 700; margin: 10px 0;">{{item.money}}</p>
        <el-button v-if="item.operating" @click="handleWithdraw" type='primary'>{{item.operating}}</el-button>
        <p class="recharge_msg_detail">
          <span v-for="(msg,i) in item.msg" :key="i">{{msg.key}}：{{msg.value}}</span>
        </p>
        <div class="today-refresh" v-if="index === 2">
          <span v-if="todayRefreshStatus" class="blue">正在刷新！</span>
          <span v-else class="red">{{60 - second}}后刷新</span>
        </div>
      </div>
    </div>
    <x-sub-title :item="subTitle" :default="defaultTitle" @change-item="changeTitle">
      <!-- <el-button type="text" @click='handleWithdrawMsg'>提现说明</el-button> -->
    </x-sub-title>
    <div class="view-section">
      <div class="search-bar">
        <el-date-picker v-model="value7" type="daterange" placeholder="选择日期范围" style="display: inline-block; width: 300px;" :picker-options="pickerOptions2">
        </el-date-picker>
        <el-input placeholder="请输入渠道 ID" icon="search" v-model="channel" style="width: 300px; display: inline-block; margin-left: 20px;" :on-icon-click="handleIconClick">
        </el-input>
        <el-button @click="exportOrders" type='primary' style='float: right; width: 100px;'>导出</el-button>
      </div>
      <div class='content'>
        <x-table :column="headerList" :data="tableData" stripe align="left">
          <template slot="col-2" scope="scope">
            用户名：{{scope.rowData.user_nickname}} <br> ID：{{scope.rowData.user_id}}
          </template>
           <template slot="col-3" scope="scope">
            渠道名：{{scope.rowData.send_order_name}} <br> 渠道ID：{{scope.rowData.send_order_id}}
          </template>
          <template slot="col-5" scope="scope">
            <span :style="{'color': scope.rowData.color}">{{scope.rowData.label}}</span>
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
import { getOrders, exportOrders, todayRecharge } from "../../api";
import { statisticsRecord } from '../../namespace'
import qs from "qs";
import { IntToMoney } from "../../util";
import withdraw from "../../components/withdraw";
function proportion(a, b) {
  const n = Math.round(a / (a + b) * 100);
  if (isNaN(n)) {
    return "0%";
  } else {
    return n + "%";
  }
}

function generateRechargeInfo() {
  let amount = {
    name: "账户余额",
    money: IntToMoney(window.options.enable_withdrawal_amount),
    msg: [
      {
        key: "已提现",
        value: window.options.accumulative_withdrawal_amount
      },
      {
        key: "提现中",
        value: window.options.weithdraw_pending
      }
    ],
    operating: "提现"
  };
  let recharge = [
    [
      "累计收益（不含当日）",
      window.options.total_recharge_amount,
      window.options.paid_number,
      window.options.unpaid_number
    ],
    ["今日充值", 0, 0, 0],
    [
      "昨日充值",
      window.options.yesterday_recharge_amount,
      window.options.yesterday_paid_number,
      window.options.yesterday_unpaid_number
    ],
    [
      "本月充值",
      window.options.current_month_recharge_amount,
      window.options.current_month_paid_number,
      window.options.current_month_unpaid_number
    ],
    [
      "上月充值",
      window.options.last_month_recharge_amount,
      window.options.last_month_paid_number,
      window.options.last_month_unpaid_number
    ]
  ].map(val => {
    return generateRechargeInfoItem(val);
  });
  recharge.splice(1, 0, amount);
  return recharge;
}

function generateRechargeInfoItem([name, money, success, fail]) {
  return {
    name,
    money: IntToMoney(money),
    msg: [
      {
        key: "已支付",
        value: success + "次"
      },
      {
        key: "未支付",
        value: fail + "次"
      },
      {
        key: "成功率",
        value: proportion(success, fail)
      }
    ]
  };
}

export default {
  name: statisticsRecord.name,
  components: { "x-withdraw": withdraw },
  data() {
    return {
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
      channel: "",
      value7: "",
      recharge: generateRechargeInfo(),
      subTitle: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "下单未充值",
          value: 0,
          color: "#ffd43f"
        },
        {
          label: "人工充值",
          value: 1,
          color: "#39a4ff"
        },
        {
          label: "充值成功",
          value: 3,
          color: "#3def91"
        }
      ],
      headerList: [
        {
          label: "商户单号",
          prop: "merchant_order_id",
          width: 10
        },
        {
          label: "用户",
          prop: "index_page",
          width: 10
        },
        {
          label: "渠道名称",
          prop: "send_order_name",
          width: 8
        },
        {
          label: "金额",
          prop: "pay_money",
          width: 5,
          className: "red"
        },
        {
          label: "支付状态",
          prop: "pay_flag",
          width: 5
        },
        {
          label: "支付时间",
          prop: "pay_time",
          width: 8
        }
      ],
      tableData: [],
      meta: {},
      timer: null,
      second: new Date().getSeconds(),
      todayRefreshStatus: false, //今日充值信息是否正在刷新,
      visible: false
    };
  },
  methods: {
    // 搜索
    handleIconClick(ev) {
      this.getOrders();
    },
    // 分页
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.getOrders(page);
      }
    },
    // 支付状态切换
    changeTitle(value) {
      const route =
        value === -1
          ? { name: statisticsRecord.name }
          : {
              name: statisticsRecord.name,
              query: { pay_flag: value }
            };
      this.$router.replace(route);
    },
    // 提现说明
    handleWithdrawMsg() {},
    // 提现
    handleWithdraw() {
      this.visible = true;
    },
    async getOrders(page) {
      const r = await getOrders({ page, ...this.query });
      r.orders.forEach(val => {
        this.addStatus(val);
      });
      this.tableData = r.orders;
      this.meta = r.meta;
    },
    addStatus(order) {
      //增加订单状态和颜色
      const defaultValue = this.subTitle.find(val => {
        return val.value === order.pay_flag;
      });
      order.color = defaultValue.color;
      order.label = defaultValue.label;
    },
    exportOrders() {
      const query = qs.stringify(this.query);
      const href =
        process.env.NODE_ENV === "development"
          ? "http://channel.wangluogudu.com/api/orders/export"
          : "/api/orders/export";
      exportOrders(href + "?" + query);
    },
    updateTodayRecharge() {
      this.todayRefreshStatus = true;
      todayRecharge().then(r => {
        let recharge = generateRechargeInfoItem([
          "今日充值",
          r.success_amount,
          r.paid_number,
          r.unpaid_number
        ]);
        this.recharge.splice(2, 1, recharge);
        this.todayRefreshStatus = false;
      });
    }
  },
  computed: {
    query() {
      const query = this.$route.query;
      const o = {};
      if (query.pay_flag !== undefined) o.pay_flag = query.pay_flag;
      if (this.channel) o.send_order_id = this.channel;
      if (this.value7[0]) o.start_time = this.value7[0].Format();
      if (this.value7[1]) o.end_time = this.value7[1].Format();
      return o;
    },
    defaultTitle() {
      if (this.$route.query.pay_flag !== undefined) return +this.$route.query.pay_flag;
      else return -1;
    }
  },
  created() {
    this.channel = this.$route.params.send_order_id
    this.getOrders();

    this.updateTodayRecharge();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.second = new Date().getSeconds();
      if (!this.second) {
        this.updateTodayRecharge();
      }
    }, 1000);
  },
  beforeRouteUpdate(to, form, next) {
    next();    
    this.value7 = "";
    this.channel = "";
    this.getOrders();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
@import "../../base/mixin.scss";
.recharge_record {
  .recharge-message {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.recharge_msg {
  background-color: #f5f6f7;
  box-sizing: border-box;
  width: calc(25% - 7.5px);
  margin: 5px 0;
  padding: 20px;
  position: relative;
  .recharge_msg_detail {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 5px 0;
      color: #9a9a9a;
      width: 100%;
    }
  }
  &:nth-child(1),
  &:nth-child(2) {
    width: calc(50% - 5px);
    .recharge_msg_detail {
      flex-wrap: nowrap;
      span {
        width: 33%;
      }
    }
  }
  &:nth-child(2) {
    position: relative;
    button {
      position: absolute;
      right: 60px;
      top: 45px;
      width: 100px;
    }
  }
  .today-refresh {
    position: absolute;
    right: 10%;
    top: 10%;
  }
}
</style>
