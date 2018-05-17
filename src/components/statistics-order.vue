<template>
  <div class="statistics-order" data-template="x-statistics-order">
    
  </div>
</template>
<script>
export default {
  name: 'x-statistics-order',
  data() {
    return {
      increaseQuality: 50
    }
  },
  install(Vue, options) {
    Vue.component(this.name, this)
  },
}
</script>
<style scoped lang="scss">

</style>