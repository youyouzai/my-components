<template>
  <el-form-item :label="options.label"> 
    <component 
      v-bind:is="currentComponent" 
      v-model="data" 
      :options="options" 
      @input="onChange"></component>
  </el-form-item>
</template>

<script>
import select from './renders/select'
import input from './renders/input'
import date from './renders/date-picker'
import transferInput from './renders/transfer-input'
export default {
  props: ['options', 'value'],
  data(){
    return {
      data: ''
    }
  },
  computed: {
    currentComponent() {
      let component = null
      switch(this.options.componentType){
        case 'select':
          component = select
          break;
        case 'date':
          component = date
          break;
        case 'transfer-input':
          component = transferInput
          break;
        case 'input':
          component = input
          break;
      }
      return component
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