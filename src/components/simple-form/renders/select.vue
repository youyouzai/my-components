<template>
  <simple-select
    v-model="data" 
    :data="options.data"
    :url="options.url"
    :multiple="options.multiple" 
    :label-field="options.labelField" 
    :value-field="options.valueField" 
    @change="onChange">
  </simple-select>
</template>

<script>
import simpleSelect from '../../simple-select'
export default {
  name: 'my-select-node',
  components: { simpleSelect },
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