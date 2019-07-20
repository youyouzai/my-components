<template>
  <div class="hello">
    <simple-table :options="options" style="width: 100%">
       <el-table-column
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
      </el-table-column>
    </simple-table>
  </div>
</template>

<script>
import SimpleTable from './simple-table'
export default {
  name: 'HelloWorld',
  components: { SimpleTable }, 
  props: {
    msg: String
  },
  data(){
    return {
      options: this.getOptions(),
      tableData: [{
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
    }
  },
  methods: {
    getOptions(){
      return {
        // url: 'http://localhost:3000/users',
        columns: this.getColumns1(),
        data: this.getData()
      }
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
            { label: '图片', prop: 'imgUrl',  contentType: 'img', filter: this.imgRender},
            { label: '链接', prop: 'product',  contentType: 'anchor', url: 'http://www.google.com', width: 180},
            { label: '操作', contentType: 'buttons', data: [{label: '查看', click: 'onViewClick'}, {label: '编辑', click: 'onEditClick'}]},
        ]
    },
    getData(){
        return [{name: 'lzg', imgUrl: '/google', product: '手机'}]
    },
  }
}
</script>

