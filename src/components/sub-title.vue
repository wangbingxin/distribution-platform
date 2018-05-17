<template>
  <div class="sub-title" data-template="sub-title">
    <span @click="check(val.value)" :class="{active: val.value === index}" v-for="(val,i) in title" :key="val.value">{{val.label}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "x-sub-title",
  props: {
    item: {
      /**
       * [{ label,value }]
       * [string]
       */
      type: Array,
      default() {
        return [];
      }
    },
    default: {
      default() {
        return (this.item[0] && this.item[0].value) || 1;
      }
    }
  },
  data() {
    return {
      index: this.default,
      title: this.generateTitle()
    };
  },
  watch: {
    default(val,old) {
      this.index = val;
    },
    item() {
      this.title = this.generateTitle();
    }
  },
  methods: {
    check(value) {
      if (value !== this.index) {
        this.index = value;
        this.$emit("change-item", value);
        this.$emit("update:default", value);
      }
    },
    generateTitle() {
      return this.item.map((val, i) => {
        if (typeof val === "string") {
          return {
            label: val,
            value: i + 1
          };
        } else {
          return val;
        }
      });
    }
  },
  install(Vue, options) {
    Vue.component(this.name, this);
  }
};
</script>
<style lang="scss">
@import "../base/mixin.scss";
.sub-title {
  font-size: 14px;
  color: #333;
  height: 49px;
  border-bottom: 1px solid #f7f7f7;
  position: relative;
  background-color: #fff;
  & > span {
    display: inline-block;
    line-height: 49px;
    margin: 0 26px;
    cursor: pointer;
    position: relative;
    &.active {
      color: $blue1;
      &::after {
        content: "";
        width: 24px;
        height: 4px;
        background-color: $blue1;
        position: absolute;
        bottom: -1px;
        border-radius: 2px;
        left: 0;
      }
    }
  }
}
</style>