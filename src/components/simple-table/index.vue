<template>
  <div>
       <el-table
        ref="table"
        :data="tableData"
        :height="height"
        :border="border"
        :stripe="stripe"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        :indent="indent"
        :lazy="lazy"
        :load="load"
        :tree-props="treeProps"
        style="width: 100%">
            <template v-if="options">
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
            </template>
            <slot></slot>
       </el-table>
       <div class="pagination-cotnainer" >
            <el-pagination
                :current-page="form.pageNo"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="form.pageSize"
                :total="totalCount"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="changeSize"
                @current-change="changePage"></el-pagination>
        </div>
  </div>
</template>

<script>
import './table-render'
import {httpGet} from  '@/util/http'
export default {
    props:['options', 'data', 'height', 'stripe', 'border', 'size', 'showHeader', 'fit', 'highlight-current-row', 'current-row-key', 
        'row-class-name', 'row-style', 'cell-class-name', 'cell-style', 'header-row-class-name', 'header-row-style', 'header-cell-class-name', 
        'header-cell-style', 'row-key', 'empty-text', 'expand-row-keys', 'default-sort', 'tooltip-effect', 
        'show-summary', 'sum-text', 'summary-method', 'span-method', 'select-on-indeterminate', 'indent', 'lazy', 'load', 'tree-props'],
    data(){
        return {
            url: '',
            form: {
                pageSize: 10,
                pageNo: 1,
            },
            totalCount: 0,
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
        },
        tableData(){
            return this.data || this.options.data
        }
    },
    mounted() {
        if(this.options) {
            this.url = this.options.url;
            this.query();
        }
    },
    methods: {
        async query(params) {
            if(!this.url) return;
            this.form = {
                ...this.form,
                ...params
            }
            const request = this.httpGet_ || httpGet;
            const response = await request(this.url, this.form);
            this.options.data = response.data;
            const totalField = this.options.totalField || 'totalCount'
            this.totalCount = response[totalField];
        },
        reset(){
           this.pageSize = 10
           this.pageNo = 1
           this.query()
        },
        changePage (val) {
            this.form.pageNo = val;
            this.query();
        },
        changeSize (val) {
            this.option.pageSize = val;
            this.query();
        },
    }
}

</script>
<style scoped>
    .pagination-cotnainer{
        margin-top: 20px;
        text-align: right;
    }
</style>