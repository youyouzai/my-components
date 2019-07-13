<template>
  <div>
       <el-table
        ref="multipleTable"
        :data="options.data"
        style="width: 100%">
        <el-table-column v-if="hasCheckBox"  type="selection" width="70"></el-table-column>
        <el-table-column  
            v-for="(column, index) in columns"
            :key="index"
            :type="column.type"
            :label="column.label"
            :prop="column.prop"
            :width="column.width">
            <template  slot-scope="scope">
                <simple-table-render :options="column" :row="scope.row"></simple-table-render>
            </template>
        </el-table-column>
       </el-table>
  </div>
</template>

<script>
import './table-render'
export default {
    props:{
        options: {
            type: Object
        }
    },
    data(){
        return {
            
        }
    },
    computed: {
        columns(){
            let columns = this.options.columns
            if(!columns) return []
            let arr =  columns.filter(column => {
                return column.type !== 'selection'
            });
            return arr
        },
        hasCheckBox(){
            let columns = this.options.columns
            return columns && columns.some(column => {
                return column.type === 'selection'
            })
        }
    },
    methods: {
        nameRender(h, row){
            return h('p', 'hello, ' + row.name)
        },
        imgRender(row){
            return '这是一个链接：' + row.imgUrl
        }
    }
}

</script>
<style>
</style>