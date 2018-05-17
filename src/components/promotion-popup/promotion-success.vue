<template>
  <div class="popup-promotion-success">
    <div class="content">
      <div class="text">
        <p>推广链接已生成，推广效果在推广统计中查看。</p>
        <p class="promotion-link">{{link}}</p>
      </div>
    </div>
    <div class="bottom">
      <el-button type="primary" class="conform " data-clipboard-target=".promotion-link">复制链接</el-button>
      <el-button type="primary" class="cancel" @click.native="handleDialog">{{isNovelCopy ? '关闭' : '取消'}}</el-button>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { novelCopy } from "../../namespace";

export default {
  props: ["link"],
  data() {
    return {
      isNovelCopy: this.$route.name === novelCopy.name
    };
  },
  methods: {
    handleDialog() {
      if(this.isNovelCopy){
        window.close()
      }
      this.$emit("close");
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
    const link = new Clipboard(".popup-promotion-success .conform");
    link.on("success", success);
    link.on("error", error);
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .text {
    margin: auto;
    p {
      text-align: center;
      line-height: 60px;
    }
  }
}

.promotion-link {
  line-height: 3em;
  margin-bottom: 1em;
}
</style>