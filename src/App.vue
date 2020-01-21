<template>
  <div id="app">
    <demo/>
  </div>
</template>

<script>
import demo from './Demo.vue'

export default {
  name: 'app',
  components: {
    demo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
