<!-- 推广统计 -->
<template>
  <div class="promote_statistics">
    <div class='title'>推广统计</div>
    <x-sub-title :item="['推广链接详情']">
      <span class="blue r">暂未统计今日数据</span>
    </x-sub-title>
    <section class="view-section">
      <div class="search-bar">
        <el-date-picker @change="getSendOrders(undefined)" v-model="value7" type="daterange" placeholder="选择日期范围" style="display: inline-block; width: 300px;" :picker-options="pickerOptions2">
        </el-date-picker>
        <el-input placeholder="请输入小说名称搜索" icon="search" v-model="input_name" v-on:keyup.enter.native="handleIconClick" style="width: 300px; display: inline-block; margin-left: 20px;" :on-icon-click="handleIconClick">
        </el-input>
        <el-button type='primary' style='float: right; width: 100px;' @click="exportSendOrders">导出</el-button>
      </div>
      <x-table :column="headerList" :data="tableData" stripe align="left">
        <template slot="col-1" scope="scope">
          <p style="font-size: 14px; color: #333">{{scope.rowData.name}}</p>
          <p class="channel-link-wrap">
            <a :href="scope.rowData.promotion_url" target="_bank" class="blue channel-link single-line">{{scope.rowData.promotion_url}}</a>
            <el-tag class="copy l" color="#32dc86" style="margin-left: 1em" :data-clipboard-text="scope.rowData.promotion_url">复制</el-tag>
          </p>
          <p style="color: #ccc; white-space: nowrap">创建时间：{{scope.rowData.updated_time}}</p>
        </template>
        <template slot="col-2" scope="scope">
          <span v-if="scope.rowData.entrance" class="blue">{{scope.rowData.entrance}}</span>
          <span v-else class="blue">《{{scope.rowData.book_name}}》</span>
        </template>
        <template slot="col-7" scope="scope">
          <span class="red">{{scope.rowData.total_recharge_amount_format}}</span>
        </template>
        <template slot="col-8" scope="scope">
          <router-link v-if="scope.rowData.total_recharge_amount" :to="{name:statisticsRecord, params: {send_order_id: scope.rowData.id}}">
            <p style="white-space: nowrap; text-align: center" class="blue">订单明细</p>
          </router-link>
          <p v-else>—</p>
        </template>
      </x-table>
      <div class="pagination" v-if="meta.last_page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </section>
  </div>
</template>
<script>
import { statisticsPromote, statisticsRecord } from "../../namespace";
import { getLocalTime } from "../../util/";
import { getSendOrders, exportSendOrders } from "../../api";
import Clipboard from "clipboard";
import qs from "qs";
export default {
  name: statisticsPromote.name,
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
      value7: [],
      input_name: "",
      headerList: [
        {
          label: "渠道或位置名称",
          prop: "distribution_channel_name",
          width: 30
        },
        {
          label: "推广入口页面",
          prop: "index_page",
          width: 20
        },
        {
          label: "点击数",
          prop: "click_number",
          width: 10
        },
        {
          label: "注册用户",
          prop: "register_user_number",
          width: 10
        },
        {
          label: "新增关注",
          prop: "net_subscribe_user_number",
          width: 10
        },
        {
          label: "付费用户",
          prop: "pay_success_user_number",
          width: 10
        },
        {
          label: "充值总额",
          prop: "total_recharge_amount_format",
          width: 10
        },
        {
          label: "操作",
          prop: "operating",
          width: 10
        }
      ],
      tableData: [],
      meta: {},
      statisticsRecord: statisticsRecord.name
    };
  },
  methods: {
    // 搜索
    async handleIconClick(ev) {
      this.getSendOrders();
    },
    // 分页
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.getSendOrders(page);
      }
    },
    async getSendOrders(page) {
      if (this.value7[0]) var start_time = this.value7[0].Format();
      if (this.value7[1]) var end_time = this.value7[1].Format();
      const book_name = this.input_name;
      const r = await getSendOrders({
        start_time,
        end_time,
        book_name,
        page
      });
      this.tableData = r.send_orders;
      this.meta = r.meta;
    },
    exportSendOrders() {
      if (this.value7[0]) var start_time = this.value7[0].Format();
      if (this.value7[1]) var end_time = this.value7[1].Format();
      if (this.input_name) var book_name = this.input_name;
      var query = qs.stringify({ start_time, end_time, book_name });
      const href =
        process.env.NODE_ENV === "development"
          ? "http://channel.wangluogudu.com/api/sendOrders/export"
          : "/api/sendOrders/export";
      exportSendOrders(href + "?" + query);
    }
  },
  mounted() {
    const success = e => {
      this.$message("复制成功");
      e.clearSelection();
    };
    const error = e => {
      this.$message.error("复制失败,请自行复制");
    };
    const title = new Clipboard(".promote_statistics .copy");
    title.on("success", success);
    title.on("error", error);
  },
  async created() {
    const order = await getSendOrders();
    this.tableData = order.send_orders;
    this.meta = order.meta;
  }
};
</script>
<style lang='scss' scoped>
.promote_statistics {
  .pagination {
    height: 100%;
  }
}

.channel-link {
  width: calc(100% - 50px);
  float: left;
  line-height: 24px;
}

.channel-link-wrap {
  .copy {
    cursor: pointer;
  }
  overflow: hidden;
}
</style>


