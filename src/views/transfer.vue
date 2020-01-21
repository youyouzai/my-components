<template>
  <el-collapse class="container"> 
      <div class="title">穿梭框</div> 
      <div class="content">
        <el-card class="box-card" style="width: 650px;">
          <div slot="header" class="clearfix">
            <span>裸衣模式</span>
          </div>
          <simple-transfer v-model="country" :url="getCountrys()" label-field="countryName" value-field="countryCode" @change="onCountryChange" style="width: 600px;height: 300px;"></simple-transfer>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>按钮弹框</span>
          </div>
          <el-button type="primary" @click="$refs.dialog.show()">点击弹出</el-button>
          <simple-transfer-dialog ref="dialog" v-model="country"  :url="getCountrys()" label-field="countryName" value-field="countryCode" @change="onCountryChange" ></simple-transfer-dialog>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Input外壳</span>
          </div>
          <simple-transfer-input v-model="country"  :url="getCountrys()" label-field="countryName" value-field="countryCode" @change="onCountryChange" ></simple-transfer-input>
        </el-card>
      </div>
  </el-collapse>
</template>

<script>
import SimpleTransferInput from '../components/simple-transfer-input';
import SimpleTransferDialog from '../components/simple-transfer-dialog';
import SimpleTransfer from '../components/simple-transfer';
import { httpGet } from  '@/util/http'
export default {
  components: { SimpleTransferInput, SimpleTransfer, SimpleTransferDialog }, 
  data(){
    return {
      transferOptions: {
        url: this.getCountrys(),
        labelField: 'countryName',
        valueField: 'countryCode'
      },
      country: [], // 表单的数据
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
  width: 450px;
  margin: 15px;
  margin-left: 10px;
  vertical-align: top;
}
</style>



