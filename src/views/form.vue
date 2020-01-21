<template>
  <el-collapse class="container"> 
      <div class="title">form表单</div> 
      <div class="content">
        <el-card class="box-card" style="width: 560px">
          <div slot="header" class="clearfix">
            <span>支持配置项options</span>
          </div>
          <simple-form v-model="form" :options="options"></simple-form>
        </el-card>
      </div>
  </el-collapse>
</template>

<script>
import { baseDef } from '@/util/rules.js';
import SimpleForm from '../components/simple-form';
export default {
  components: { SimpleForm }, 
  data(){
    return {
      options: { // 表单结构
        labelWidth: '80px',
        inline: true,
        rules: baseDef,
        data: [
          {componentType: 'input', label: '国家：', prop: 'country'},
          {componentType: 'date', label: '日期：', prop: 'date', type: 'daterange'},
          {componentType: 'select', label: '省份：', prop: 'provinces', data: ['广东省', '山东省', '江西省', '广西省']},
        ]
      },
      form: {
        country: '11',
        provinces: '22'
      }
    }
  }
}
</script>
<style scoped>
.container{
  padding: 5px;
}
.container .title{
  background: #eee;
  padding: 10px;
  color: #1989fa;
  font-weight: bold;
}
.container .content {
  border: solid 1px #eee;
}
.box-card{
  display: inline-block;
  width: 450px;
  margin: 15px;
  margin-left: 10px;
}
</style>



