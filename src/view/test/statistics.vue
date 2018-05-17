<template>
  <div class="statistics" data-template="statistics">
    <div class="title">数据统计</div>
    <x-sub-title :item="textItem" @change-item="changeTextItem" style="background: #fff"></x-sub-title>
    <div class="statistics-summary">
      <x-grid class="l" v-for="(val,i) in summary" :key="i" :data="val.data">
        <div class="summary-title" slot="head">{{val.title}}</div>
      </x-grid>
    </div>
    <div class="statistics-chart">
      <x-sub-title :item="['关注趋势展示']"></x-sub-title>
      <div class="chart" ref="chart"></div>
    </div>
    <div class="statistics-table">
      <x-sub-title :item="['近30天关注统计']"></x-sub-title>
      <x-table :column="userColumn" :data="userData.detail" stripe></x-table>
    </div>
  </div>
</template>
<script>
import charts from '../util/charts'
import userData from '../analog-data/statistics-user.json'
const summaryTitle = ['今日新增', '昨日新增', '本月新增（不含当日）', '累计新增（不含当日）']
function generateUserSummary(arr) {
  return arr.map((val, i) => {
    return {
      data: [
        [val.user, '', ''],
        ['已关注', '', val.subscribe + '人'],
        ['已付费', '', val.recharge + '人']
      ],
      title: summaryTitle[i],
    }
  })
}
function generateOrderSummary(arr) {
  return arr.map((val, i) => {
    return {
      data: [
        [val.user, '', ''],
        ['已关注', '', val.subscribe + '人'],
        ['已付费', '', val.recharge + '人']
      ],
      title: summaryTitle[i],
    }
  })
}
export default {
  name: 'statistics',
  params: 'type',
  redirect: '/statistics/order',
  type: 2,
  data() {
    return {
      textItem: ['订单统计', '用户统计'],
      userData,
      summary: generateUserSummary([userData.today, userData.yesterday, userData.month, userData.total]),
      userColumn: userData.column,
    }
  },
  methods: {
    changeTextItem(i) {

    }
  },
  mounted() {
    this.chart = charts.init(this.$refs.chart,this.userData)
  },
  beforeDestroy() {
    charts.destroy(this.chart)
  },
  menu: {
    name: '数据统计',
    key: 'statistics',
    icon: '#icon-daohang-shujufenxi',
    route: { name: 'statistics', params: { type: 'order' } }
  },
}
</script>

<style lang="scss">
.statistics-summary {
  background-color: #fff;
  padding: 22px 26px;
  overflow: hidden;
  .summary-title {
    color: #333333;
    font-size: 14px;
    padding: 5px;
  }
}

.statistics-chart {
  .chart {
    height: 330px;
  }
  background-color: #fff;
  margin-top: 26px;
}

.statistics-table {
  background-color: #fff;
  margin-top: 26px;
}

.statistics .grid {
  margin-right: percentage(0.04/3);
  width: 24%;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 12px 18px;
  color: #666;
  &:last-child {
    margin: 0;
  }
  td {
    width: 33%;
  }
  .row-1-col-1 {
    color: #ff5d5d;
    font-size: 14px;
  }
  .col-3 {
    text-align: right
  }
}
</style>
