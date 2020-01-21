<template>
  <div>
       <el-table
        ref="table"
        :data="tableData"
        :height="$attrs.height"
        :border="$attrs.border"
        :stripe="$attrs.stripe"
        :show-header="$attrs.showHeader"
        :highlight-current-row="$attrs.highlightCurrentRow"
        :current-row-key="$attrs.currentRowKey"
        :row-class-name="$attrs.rowClassName"
        :row-style="$attrs.rowStyle"
        :cell-class-name="$attrs.cellClassName"
        :cell-style="$attrs.cellStyle"
        :header-row-class-name="$attrs.headerRowClassName"
        :header-row-style="$attrs.headerRowStyle"
        :header-cell-class-name="$attrs.headerCellClassName"
        :header-cell-style="$attrs.headerCellStyle"
        :row-key="$attrs.rowKey"
        :empty-text="$attrs.emptyText"
        :expand-row-keys="$attrs.expandRowKeys"
        :default-sort="$attrs.defaultSort"
        :tooltip-effect="$attrs.tooltipEffect"
        :show-summary="$attrs.showSummary"
        :sum-text="$attrs.sumText"
        :summary-method="$attrs.summaryMethod"
        :span-method="$attrs.spanMethod"
        :select-on-indeterminate="$attrs.selectOnIndeterminate"
        :indent="$attrs.indent"
        :lazy="$attrs.lazy"
        :load="$attrs.load"
        :tree-props="$attrs.treeProps"
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
import { httpGet } from  '@/util/http'
import { getField } from  '@/util/util'
export default {
    props:['options', 'data'],
    data(){
        return {
            url: '',
            form: {
                pageSize: 10,
                pageNo: 1,
            },
            tableData: [],
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
        dataField() {
            return this.options.dataField || 'data'
        },
        totalField() {
            return this.options.totalField || 'totalCount'
        }
    },
    watch: {
        data(val){
            this.tableData = val;
        }
    },
    mounted() {
        if(this.options) {
            this.url = this.options.url;
            this.tableData = this.options.data;
            this.query();
        }
        this.tableData = this.data;
    },
    methods: {
        async query(params) {
            if(!this.url) return;
            if(this.url.then) {
                // 是promise对象
                const _self = this;
                this.url.then((response) => {
                    _self.initDataByResponse(response)
                })
            } else if(typeof(this.url) === 'string'){
                this.form = {
                    ...this.form,
                    ...params
                }
                const { data } = await httpGet(this.url, this.form);
                this.initDataByResponse(data)
            }  
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
            this.form.pageSize = val;
            this.query();
        }, 
        initDataByResponse(response) {
            this.tableData = getField(response, this.dataField);
            this.totalCount = getField(response, this.totalField);
        }
    }
}

</script>
<style scoped>
    .pagination-cotnainer{
        margin-top: 20px;
        text-align: right;
    }
</style>