<template>
  <div class="notice">
    <div class="title">通知公告</div>
    <x-table :column="tableColumn" :data="tableData" stripe>
      <template slot="row-1-col-2" scope="scope">
        <span>{{scope.rowData.content}}</span>
        <el-tag color="#ff6d6d" style="margin-left: 2em">最新公告</el-tag>
      </template>
    </x-table>
    <div class="pagination"  v-if="meta.last_page">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="10" :total="100"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import data from '../../analog-data/notify.json'
export default {
  name: 'notice',
  data() {
    return {
      tableData: data,
      tableColumn: [
        {
          width: '180',
          label: '日期',
          prop: 'update'
        }, {
          label: '内容',
          prop: 'content'
        }
      ],
      page: 1
    }
  },
  methods: {
    handleCurrentChange(currentPage) {

    }
  },
  menu: {
    name: '通知公告',
    key: 'notice',
    icon: '#icon-daohang-xiaoshuoliebiao',
    route: { name: 'notice' }
  },
}
</script>
<style scoped lang="scss">
</style>
