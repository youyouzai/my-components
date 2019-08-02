<template>
  <div class="hello">
    <div class="container">  
      <el-form>
        <el-form-item>
          <simple-select v-model="form.country" :url="getCountrys()"  label-field="countryName" value-field="countryCode" @change="onCountryChange"></simple-select>
          <span> {{ `country: ${form.country}` }}</span>
        </el-form-item>
      </el-form>
      
    </div>
    <simple-table :options="options" :data="tableData"  border stripe size="mini" style="width: 100%" :highlightCurrentRow="true">
       <!-- <el-table-column
        prop="date"
        label="日期11"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名22"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址333">
      </el-table-column> -->
    </simple-table>
  </div>
</template>

<script>
import SimpleTable from './simple-table'
import SimpleSelect from './simple-select1'
import { httpGet } from  '@/util/http'
import { setTimeout } from 'timers';
export default {
  name: 'HelloWorld',
  components: { SimpleTable, SimpleSelect }, 
  props: {
    msg: String
  },
  data(){
    return {
      options: this.getOptions(),
      form: {
        country: ['cn'],
      },
      selectDataSource: [{name: '中国', code: 'cn'}, {name:'英国', code: 'english'}],
      tableData: []
    }
  },
  watch: {
    ['form.country']:{
      handler: (val) => {
        console.log('country=' +val);
      }  
    }
  },
  mounted() {
    const _self = this;
    setTimeout(function() {
      _self.tableData = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }, 1000)
  },
  methods: {
    getOptions(){
      return {
        url: this.getTableData(),
        columns: this.getColumns(),
        // data: this.getData()
      }
    },
    getCountrys() {
      return httpGet('http://localhost:3000/countrys');
    },
    getTableData() {
      return httpGet('http://localhost:3000/users');
    },
    getColumns1(){
        return [
            { type: 'selection',  width: 180},
            { label: '日期', prop: 'name'},
            { label: '姓名', prop: 'name'},
            { label: '地址', prop: 'address'},
        ]
    },
    getColumns(){
        return [
            { type: 'selection',  width: 180},
            { label: '商品', prop: 'name',  width: 180, render: this.nameRender},
            { label: '图片', prop: 'imgUrl',  contentType: 'img', formatter: this.imgRender},
            { label: '图标', prop: 'icon',  contentType: 'icon', formatter: this.iconRender},
            { label: '链接', prop: 'product',  contentType: 'anchor', url: 'http://www.google.com', width: 180},
            { label: '操作', contentType: 'buttons', data: [{label: '查看', type: 'primary', click: this.onViewClick}, {label: '编辑', type: 'primary', click: this.onEditClick}]},
        ]
    },
    getData(){
        return [{name: 'lzg1', status: 1,  imgUrl: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg', product: '手机'},
        {name: 'lzg2', status: 1,  imgUrl: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg', product: '手机'},
        {name: 'lzg3', status: 2,  imgUrl: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg', product: '手机'},
        {name: 'lzg4', status: 2,  imgUrl: '/google', product: '手机'},
        {name: 'lzg5', status: 1,  imgUrl: '/google', product: '手机'}]
    },
    iconRender(row) {
      return row.status == 1? 'el-icon-circle-check color-success' : 'el-icon-user-solid'
    },
    onViewClick(row){
      console.log(JSON.stringify(row))
    },
    onEditClick(row){
      console.log(JSON.stringify(row))
    },
    onCountryChange(value){
      console.log('change=' + value)
    }
  }
}
</script>
<style>
.table-header{
  background-color: red !important;
}
.color-success {
  font-size: 22px;
  color: #13ce66;
}
.container{
  margin: 15px;
}
</style>


