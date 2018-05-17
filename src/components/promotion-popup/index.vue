<template>
    <component :is="type" v-if="!success" :id="id" :name="name" :info="info" :chapter="chapter" @close="handleDialog" @success="promotionSuccess"></component>
    <x-success v-else :link="link" @close="handleDialog"></x-success>
</template>

<script>
import success from "./promotion-success.vue";
import page from "./page.vue";
import novel from "./novel.vue";
export default {
  props: {
    type: {
      default() {
        return "x-page";
      }
    },
    status: {
      type: Boolean
    },
    name: {},
    id: {},
    info: {},
    chapter: {}
  },
  components: {
    "x-success": success,
    "x-page": page,
    "x-novel": novel
  },
  data() {
    return {
      success: false,
      link: ""
    };
  },
  methods: {
    handleDialog() {
      this.$emit("update:status", false);
    },
    promotionSuccess(link) {
      this.success = true;
      this.link = link;
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.success = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>