<template>
  <div class="grid" data-template="grid">
    <slot name="head"></slot>
    <table>
      <tr v-for="(rowData,row) in data" :key="row" :class="`row-${row+1}`">
        <td v-for="(cell,col) in rowData" :key="col" :class="`col-${col+1} row-${row+1}-col-${col+1}`">
          <div class="cell">{{cell}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'x-grid',
  props: {
    data: {
      type: Array,
      require: true,
      validator(val) {
        let len, flag = true
        val.forEach((v, i) => {
          if (!Array.isArray(v)) return flag = false
          if (i) {
            if (len !== v.length) return flag = false
          } else {
            len = v.length
          }
        })
        return flag
      }
    }
  },
  data() {
    return {

    }
  },
  install(Vue, options) {
    Vue.component(this.name, this)
  },
}
</script>
<style lang="scss">
.grid table {
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  table-layout: fixed;
  .cell{
    padding: 5px;
    white-space: nowrap;
  }
}
</style>