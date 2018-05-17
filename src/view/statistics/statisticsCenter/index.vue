<!-- 结算 -->
<template>
  <div class="settlement-center">
    <div class='title'>{{Chinese}}</div>
    <x-sub-title :item="item" :default="$route.name" @change-item="handleMenu"></x-sub-title>
    <router-view></router-view>
  </div>
</template>
<script>
import {
  statisticsCenter,
  statisticsAmount,
  statisticsWithdraw,
  statisticsWithdrawSetting
} from "../../../namespace";
export default {
  name: statisticsCenter.name,
  data() {
    return {
      Chinese:statisticsCenter.Chinese,
      item: [
        {
          label: statisticsAmount.Chinese,
          value: statisticsAmount.name
        },
        {
          label: statisticsWithdraw.Chinese,
          value: statisticsWithdraw.name
        },
        {
          label: statisticsWithdrawSetting.Chinese,
          value: statisticsWithdrawSetting.name
        }
      ]
    };
  },
  methods: {
    // 支付状态切换
    handleMenu(value) {
      return this.$router.replace({ name: value });
    }
  }
};
</script>
<style lang='scss' scoped>

</style>
