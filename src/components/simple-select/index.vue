<template>
    <el-select 
        v-model="value" 
        :clearable="clearable"
        :multiple="multiple"
        :filterable="filterable"
        :placeholder="placeholder"  
        @change="onChange">
        <el-option v-for="(item,index) in list" :key="index" :value="item[valueField]" :label="item[labelField]"></el-option>
    </el-select>
</template>

<script>
import { httpGet } from  '@/util/http'
import { getField } from  '@/util/util'
export default {
    props: {
        url: {
            default: ''
        },
        data: {
            default: ()=> []
        },
        labelField: {
            type: String,
            default: 'label'
        },
        valueField: {
            type: String,
            default: 'value'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: true
        },
        dataField: {
            type: String,
            default: 'data'
        }
    },
    data() {
        return {
            value: {},
            dataSource: []
        }
    },
    computed: {
        list() {
            if(toString.call(this.dataSource === '[object Array]')){
                return this.dataSource;
            }else if(toString.call(this.dataSource === '[object Object]')){
                let result = [];
                for(const key in this.dataSource) {
                    result.push({
                        label: this.dataSource[key],
                        value: key
                    });
                }
                return result;
            }else {
                return [];
            }
        }
    },
    watch: {
        value(val) {
            this.$emit('input', val);
        },
        data(val) {
            this.dataSource = val;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init(params) {
            if(!this.url) return;
            var _self = this;
            if(this.url.then){
                // 是promise对象
                this.url.then(response => {
                    _self.dataSource = getField(response, _self.dataField);
                })
            }else if(typeof(this.url) === 'string'){
                const { data } = await httpGet(_self.url, { params });
                _self.dataSource = data;
            }
            
        },
        onChange(){
            this.$emit('change', this.value)
        }
    }
}

</script>
<style>
</style>