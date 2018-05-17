<template>
  <div class="service-setting">
    <div class="title">{{Chinese}}</div>
    <x-sub-title :item="tabTitle" @change-item="changeTextItem" :default="$route.name">
    </x-sub-title>
    <router-view></router-view>
  </div>
</template>
<script>
import {
  settingService,
  serviceNew,
  serviceList,
  serviceOption
} from "../../../namespace";
import role from "../../../jurisdiction";
export default {
  name: settingService.name,
  data() {
    const tabTitle = [];
    [serviceList,serviceNew].forEach(val => {
      if (role.route[val.name]) {
        tabTitle.push({
          label: val.Chinese,
          value: val.name
        });
      }
    });
    return {
      Chinese: settingService.Chinese,
      tabTitle
    };
  },
  methods: {
    changeTextItem(val) {
      this.$router.replace({ name: val });
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-guide {
  color: blue;
  position: absolute;
  right: 20px;
  line-height: 50px;
}
</style>