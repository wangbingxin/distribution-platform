<template>
  <th class="x-table-column" data-template="x-table-column" :style="style">
    <div class="cell">{{label}}</div>
  </th>
</template>
<script>
export default {
  name: 'x-table-column',
  props: {
    prop: {
      type: String,
      required: true,
    },
    width: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    }
  },
  data() {
    const style = this.width
      ? { width: this.width + 'px' }
      : {}
    return {
      style,
    }
  },
  install(Vue, options) {
    Vue.component(this.name, this)
  }
}
</script>
<style scoped lang="scss">

</style>