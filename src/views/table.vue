<template>
  <el-collapse class="container"> 
      <div class="title">table表格</div> 
      <div class="content">
        <el-card class="box-card" style="width: 1200px">
          <div slot="header" class="clearfix">
            <span>设置url为promise</span>
          </div>
           <simple-table :options="options" :data="tableData" :showHeader="true"  border stripe size="mini" style="width: 100%" :highlightCurrentRow="true">
            <el-table-column
              prop="date"
              label="日期11"
              width="180">
            </el-table-column>
          </simple-table>
        </el-card>
      </div>
  </el-collapse>
</template>

<script>
import SimpleTable from '../components/simple-table'
import { httpGet } from  '@/util/http'
export default {
  components: { SimpleTable }, 
  data(){
    return {
      tableData: this.getData(),
      options: this.getOptions()
    }
  },
  watch: {
    tableData(val) {
      console.log('tableData=' + JSON.stringify(val));
    }
  },
  mounted() {
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



