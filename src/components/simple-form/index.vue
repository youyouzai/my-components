<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :inline="options.inline"
      :label-width="options.labelWidth">
      <simple-form-item 
        v-for="(item, index) in options.data" 
        :key="index"
        v-model="form[item.prop]"
        :options="item">
      </simple-form-item>
      <el-form-item v-if="showButtons"> 
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import simpleFormItem from './simple-form-item'
export default {
  components: { simpleFormItem },
  props: ['options', 'value'],
  data() {
    return {
        form: {}
    };
  },
  computed: {
      showButtons() {
          return this.options.showButtons === undefined || this.options.showButtons
      }
  },
  watch: {
      form: {
          handler(val){
              this.$emit('input', val)
          },
          deep: true
      },
      value(val){
          this.form = val
      }
  },
  created() {
    this.form = this.value
  },
  methods: {
    onSubmit() {
        this.$emit('submit', this.form)
    },
    onReset() {
        this.$refs.form.resetFields();
    }
  }
};
</script>
