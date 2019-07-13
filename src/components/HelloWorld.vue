<template>
  <div class="hello">
    <simple-table :options = "options"></simple-table>
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
      options: this.getOptions()
    }
  },
  methods: {
    getOptions(){
      return {
        columns: this.getColumns(),
        data: this.getData()
      }
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

