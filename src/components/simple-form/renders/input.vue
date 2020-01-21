<template>
  <el-input v-model="data" :placeholder="options.placeholder" @input="onChange"></el-input>
</template>

<script>
export default {
  name: 'my-input-node',
  props: ['options', 'value'],
  data(){
    return {
      data: ''
    }
  },
  watch: {
    value(val) {
      this.data = val
    }
  },
  created() {
    this.data = this.value
  },
  methods: {
    onChange(data){
      this.$emit('input', data)
    }
  }
}
</script>
<style>
</style>