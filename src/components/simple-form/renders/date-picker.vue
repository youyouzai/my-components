<template>
  <el-date-picker 
    v-model="data" 
    :type="options.type" 
    :placeholder="options.placeholder" 
    @change="onChange"
  >
  </el-date-picker>
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