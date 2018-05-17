<template>
  <div class="service-list view-section">
    <div class="service-text">
      请设置多个强关服务号，防止微信清粉。由于微信新规每日新增粉丝过多，会清空当日新增粉丝数量，为了降低被清粉风险，请设置多个服务号。当某个服务号当日新增粉丝超过阀值，自动强制关注下一个备用服务号。
    </div>
    <br>
    <x-table :column="tableTitle" :data="userData" stripe>
      <template slot="col-1" scope="scope">
        {{scope.row}}
      </template>
      <template slot="col-8" scope="scope">
        <router-link class="blue" target="_blank" :to="{name: serviceOption,query:{name:scope.rowData.name}}">操作</router-link>
      </template>
    </x-table>
  </div>
</template>
<script>
// import userData from '../../../analog-data/statistics-user.json'
import { getOfficialAccountsUserStat } from "../../../api";
import {
  settingService,
  serviceNew,
  serviceList,
  serviceOption
} from "../../../namespace";
export default {
  name: serviceList.name,
  data() {
    return {
      userData: [],
      tableTitle: [
        {
          label: "序号",
          prop: "id"
        },
        {
          label: "服务号名称",
          prop: "nickname"
        },
        {
          label: "总粉丝",
          prop: "total_user_number"
        },
        {
          label: "今日新增粉丝",
          prop: "today_new_user_number"
        },
        {
          label: "日增粉丝阀值",
          prop: "subscribe_day_maximum"
        },
        {
          label: "总增粉丝阀值",
          prop: "subscribe_top_num"
        },
        {
          label: "授权情况",
          prop: "is_auth"
        },
        {
          label: "操作",
          prop: ""
        }
      ],
      serviceOption: serviceOption.name
    };
  },
  methods: {},
  created() {
    getOfficialAccountsUserStat().then(r => {
      this.userData = r;
    });
  }
};
</script>
<style lang="scss" scoped>

</style>