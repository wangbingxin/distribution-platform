<template>
  <div class="home">
    <div class="title">官方消息</div>
    <div class="home-header view-section-spacing">
      <div class="header-item" v-for="(item,i) in head" :key="item.name">
        <img :src="item.icon">
        <p>
          <span class="name">{{item.name}}</span>
          <br>
          <span class="value">{{item.value}}</span>
        </p>
      </div>
    </div>
    <div class="home-body">
      <x-sub-title :item="noticeType" :default="checkedNoticeType" @change-item="noticeTypeChange"></x-sub-title>
      <x-table :column="tableColumn" :data="tableData" stripe>
        <template slot="col-2" scope="scope">
          <span>{{"【" + (scope.rowData.type_name == '' ? '其他' : scope.rowData.type_name )+ "】"}} </span>
          <span @click="showNotice(scope.rowData)">{{scope.rowData.title}}</span>
          <!-- <el-tag color="#ff6d6d" style="margin-left: 2em">最新公告</el-tag>  -->
        </template>
      </x-table>
      <div class="pagination" v-if="meta.last_page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <!-- 公告弹框 -->
    <el-dialog :title="notice.data.title" :visible.sync="notice.status" custom-class="home-notice">
      <div v-html="notice.data.content"></div>
      <div slot="footer">
        <el-button type="primary" @click="notice.status = false">我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { home } from "../../namespace";
// import data from "../../analog-data/notify.json";
import { getNotices, getNoticeTypes, todayRecharge } from "../../api";
import { QuadEaseInOut, setCookie, getCookie, IntToMoney } from "../../util";
const head = [
  {
    name: "总充值（不含当天）",
    icon: require("../../assets/总充值.png"),
    value: 0
  },
  {
    name: "今日充值",
    icon: require("../../assets/jint.png"),
    value: 0
  },
  {
    name: "昨日充值",
    icon: require("../../assets/zuoit.png"),
    value: 0
  },
  {
    name: "佣金比例",
    icon: require("../../assets/bili.png"),
    value: window.options.commission_rate
  }
];
export default {
  name: home.name,
  data() {
    return {
      head,
      noticeType: [],
      checkedNoticeType: 0,
      tableData: [],
      tableColumn: [
        {
          width: "180",
          label: "日期",
          prop: "updated_time"
        },
        {
          label: "标题",
          prop: "title"
        }
      ],
      notice: {
        status: false,
        data: {}
      },
      meta: {},
      request: null
    };
  },
  methods: {
    showNotice(notice) {
      this.notice.status = true;
      this.notice.data = notice;
    },
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.$router.replace({
          name: home.name,
          query: { type: this.$route.query.type, page }
        });
      }
    },
    noticeTypeChange(value) {
      this.$router.replace({
        name: home.name,
        query: { type: value }
      });
    },
    numberAnimate(n, o) {
      //数字跳动函数
      const initialTime = new Date();
      const length = (n + "").length;
      const fill = "0".repeat(length);
      let timer = setInterval(function() {
        const t = new Date() - initialTime;
        const b = 0;
        const c = n;
        const d = 600;
        let tmp = Math.round(QuadEaseInOut(t, b, c, d)) + "";
        tmp = "0".repeat(length - tmp.length) + tmp;
        if (t >= d) {
          clearInterval(timer);
          o.value = IntToMoney(n);
        } else {
          o.value = IntToMoney(tmp);
        }
      }, 30);
    },
    async execNumberAnimate() {
      //执行numberAnimate
      const today = (await this.request)[2].success_amount;
      const amount = [
        window.options.total_recharge_amount,
        today,
        window.options.yesterday_recharge_amount
      ];
      amount.forEach((val, i) => {
        this.numberAnimate(val, this.head[i]);
      });
    },
    async autoPopup() {
      function getShowedNotice() {
        let showedNotice = [];
        try {
          showedNotice = JSON.parse(getCookie("showedNotice"));
          showedNotice = showedNotice.filter(val => {
            return new Date(val.updated_time) > timestamp;
          });
        } catch (e) {}
        return showedNotice;
      }
      function setShowedNotice(list, item) {
        list.push({
          id: item.id,
          updated_time: item.updated_time
        });
        setCookie("showedNotice", JSON.stringify(list), timeRange);
      }
      const timeRange = 7 * 24 * 60 * 60 * 1000, //有效时间时长 7天
        timestamp = +new Date() - timeRange; //最早有效时间的时间戳
      let showedNotice = getShowedNotice(), //弹出公告的记录
        flag = true,
        page = 1;
      while (flag) {
        const notices = await getNotices({ page });
        const selected = notices.notices.find(val => {
          return (
            val.is_popup &&
            +new Date(val.updated_time) > timestamp &&  
            !showedNotice.some(oldVal => {
              return oldVal.id === val.id;
            })
          );
        });
        if (selected) {
          flag = false;
          this.showNotice(selected);
          setShowedNotice(showedNotice, selected);
        } else {
          if (
            notices.meta.last_page > page &&
            new Date(notices.notices.pop().updated_time) > timestamp
          ) {
            //有下一页并且在时间范围内进入下次循环
            page++;
            flag = false; //改成只支持第一页了
          } else {
            flag = false;
          }
        }
      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const type = to.query.type && +to.query.type;
    const page = to.query.page && +to.query.page;
    const notices = await getNotices({ notice_type_id: type, page });
    this.tableData = notices.notices;
    this.meta = notices.meta;
    next();
  },
  async created() {
    const type = this.$route.query.type;
    const page = this.$route.query.page;
    if (type) {
      this.checkedNoticeType = +type;
    }
    this.request = Promise.all([
      getNotices({
        notice_type_id: type,
        page
      }),
      getNoticeTypes(),
      todayRecharge()
    ]);
    let [notices, noticeType, today] = await this.request;
    this.tableData = notices.notices;
    noticeType = noticeType.map((val, i) => {
      return {
        value: val.id,
        label: val.name
      };
    });
    noticeType.unshift({ value: 0, label: "全部" });
    this.noticeType = noticeType;
    this.head[1].value = today.success_amount;
    this.meta = notices.meta;
  },
  mounted() {
    this.execNumberAnimate();
    this.autoPopup();
  }
};
</script>
<style lang="scss">
@import "../../base/mixin.scss";
.home-body .x-table-body-col-1 {
  .cell {
    @include multiLine(1);
  }
  span {
    cursor: pointer;
    color: #4c4c4c;
  }
}

.home-notice {
  top: 10%;
  bottom: 10%;
  margin-bottom: 0;
  overflow: hidden;
  .el-dialog__body {
    position: relative;
    overflow: auto;
    height: calc(100% - 120px);
    box-sizing: border-box;
  }
}
</style>


<style lang="scss" scoped>
@import "../../base/mixin.scss";
.home-header {
  background-color: #fff;
  height: 127px;
  @include flex;
  .header-item {
    flex: 1;
    @include flex($space: center);
    &:not(:last-child) {
      border-right: 1px solid #f2f4f5;
    }
  }
  .name,
  .value {
    line-height: 30px;
    word-wrap: break-word;
  }
  .name {
    font-size: 16px;
  }
  .value {
    font-size: 18px;
    color: #ff6d6d;
  }
}

.x-table {
  padding: 26px;
}
</style>


