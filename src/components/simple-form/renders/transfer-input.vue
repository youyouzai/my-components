<template>
  <transfer-input
    v-model="data" 
    :data="options"
    :url="options.url"
    :multiple="options.multiple" 
    :label-field="options.labelField" 
    :value-field="options.valueField" 
    @change="onChange">
  </transfer-input>
</template>

<script>
import transferInput from '../../simple-transfer-input'
export default {
  name: 'transfer-input-node',
  components: { transferInput },
  props: ['options', 'value'],
  data(){
    return {
      data: this.options.multiple ? [] : ''
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