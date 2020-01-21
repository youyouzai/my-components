<template>
  <el-collapse class="container"> 
      <div class="title">下拉框</div> 
      <div class="content">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设置data为数组</span>
          </div>
          <simple-select v-model="data" multiple :data.sync="arr" label-field="countryName" value-field="countryCode" @change="onCountryChange"></simple-select>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设置url为promise对象</span>
          </div>
          <simple-select v-model="data1" multiple :url="getCountrys()" label-field="countryName" value-field="countryCode" @change="onCountryChange"></simple-select>
        </el-card>
      </div>
  </el-collapse>
</template>

<script>

import SimpleSelect from '../components/simple-select'
import { httpGet } from  '@/util/http'
export default {
  components: { SimpleSelect }, 
  data(){
    return {
      data: ['cn'],
      data1: ['CN'],
      arr: ['cn','english']
    }
  },
  methods: {
    getCountrys() {
      return httpGet('http://localhost:3000/countrys');
    },
    onCountryChange(value){
      console.log('change=' + value)
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
  width: 250px;
  margin: 15px;
  margin-left: 10px;
}
</style>



