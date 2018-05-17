<template>
  <div class="promotion-notify">
    <div class="title">{{Chinese}}</div>
    <x-sub-title :item="subTitle" @change-item="href" :default="active"></x-sub-title>
    <router-view class="promotion-notify-content"></router-view>
  </div>
</template>

<script>
import { promotionNotify, promotionNotifyNew, promotionNotifyList } from '../../../namespace'

const children = [promotionNotifyList, promotionNotifyNew]

export default {
  name: promotionNotify.name,
  data() {
    return {
      Chinese: promotionNotify.Chinese,
      subTitle: children.map(val => val.Chinese),
      active: 1,
    }
  },
  methods: {
    href(i) {
      this.$router.push({ name: children[i - 1].name })
    },
    changeTitle(){
      children.forEach((val, i) => {
        if(val.name === this.$route.name) this.active = i + 1
      })
    }
  },
  created(){
    this.changeTitle()
  },
  beforeRouteUpdate(to,from,next){
    next()
    this.changeTitle()
  }
}
</script>

<style lang="scss" scoped>
.promotion-notify-content {
  background-color: #fff;
  padding: 26px;
}
</style>