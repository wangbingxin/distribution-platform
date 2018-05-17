<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  props: ['icon'],
  name: 'x-svg',
  data() {
    return {}
  },
  methods: {
  },
  install(Vue, options) {
    Vue.component(this.name, this)
  },
}
</script>

<style lang="scss" scoped>

</style>