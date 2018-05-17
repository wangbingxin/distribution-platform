<template>
  <div class="promotion-notify-list">
    <x-table :column="tableColumn" :data="tableData" stripe>
      <template slot="col-4" scope="scope">
        {{scope.rowData.status ? '未发送' : '已发送'}}
      </template>
      <template slot="col-5" scope="scope">
        <!-- <span>查看</span> -->
        <span v-if="scope.rowData.send_status === '1'">已发送</span>
        <span v-else-if="scope.rowData.status === '1'" @click="stopTemplate(scope.rowData)">停止发送</span>
        <span v-else>已停止</span>
      </template>
    </x-table>
    <div class="pagination" v-if="meta.last_page">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getWechatTemplateMsgs, stopWechatTemplates } from '../../../api'
const tableColumn = [
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: '任务名称',
    prop: 'template_name',
  },
  {
    label: '发送时间',
    prop: 'send_time',
  },
  {
    label: '发送状态',
    prop: 'status',
  },
  {
    label: '操作',
    prop: 'operation',
  },
]

export default {
  data() {
    return {
      page: 1,
      tableColumn,
      tableData: [],
      meta: {}
    }
  },
  methods: {
    handleCurrentChange(page) {
      getWechatTemplateMsgs(page).then(r => {
        this.meta = r.meta
        this.tableData = r.msgs
      })
    },
    stopTemplate(data) {
      stopWechatTemplates(data.id)
      data.status = '0'
    }
  },
  created() {
    getWechatTemplateMsgs().then(r => {
      this.meta = r.meta
      this.tableData = r.msgs
    })
  }
}
</script>
<style>
.promotion-notify-list .cell.cell {
  white-space: nowrap;
}

.promotion-notify-list table {
  table-layout: fixed;
}

.promotion-notify-list .x-table-body-col-3 {
  font-size: 12px;
}
</style>

<style lang="scss" scoped>
@import '../../../base/mixin.scss';

.x-table-body-col-4 span {
  &:first-child {
    // padding-right: 30px;
  }
  color: $blue1;
  cursor: pointer;
}
</style>