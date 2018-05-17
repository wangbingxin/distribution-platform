<template>
  <div class="x-pagination">
    <el-pagination @current-change="handleCurrentChange" :current-page="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "x-pagination",
  props: {
    params: {
      required: true,
      type: String
    },
    meta: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      oParams: null,
      oPage: null
    };
  },
  methods: {
    handleCurrentChange(page) {
      console.log(
        "page",
        page,
        this.meta.current_page,
        this.meta.current_page === page
      );
      // console.log("params", this.params);
      // console.log( this.meta.current_page);
      // console.log(this.params, this.oParams);
      // if (params !== this.oPage) this.$emit("current-change", page);
      this.$emit("current-change", page);
    }
  },
  watch: {
    params(val, oVal) {
      this.oParams = oVal;
    },
    meta(val, oVal) {
      // console.log('watch',oVal.current_page)
      this.oPage = oVal && oVal.current_page;
    }
  },
  install(Vue, options) {
    Vue.component(this.name, this);
  }
};
</script>
<style lang="scss">
.x-pagination {
  overflow: hidden;
  background-color: #fff;
  padding: 20px 26px;
  .el-pagination {
    float: right;
  }
}
</style>