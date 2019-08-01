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
export default {
    props: {
        url: {
            type: String,
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
        }
    },
    data() {
        return {
            value: {

            }
        }
    },
    computed: {
        list() {
            if(toString.call(this.data === '[object Array]')){
                return this.data;
            }else if(toString.call(this.data === '[object Object]')){
                let result = [];
                for(const key in this.data) {
                    result.push({
                        label: this.data[key],
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
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init(params) {
            if(!this.url) return;
            const { data } = this.$http.get(this.url, { params });
            this.data = data;
        },
        onChange(){
            this.$emit('change', this.value)
        }
    }
}

</script>
<style>
</style>