<template>
    <div  class="u-simple-select">
        <el-input v-model="condition" :placeholder="placeholder" @input="search"></el-input>
        <div class="panel">
            <el-row class="item">
                <el-col :span="18">全部</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="selectedAll" :disabled="disabled" @change="onAllSelectedChange"></el-checkbox>
                </el-col>
            </el-row>
            <el-row v-for="(item, index) in dataList" :key="index" class="item">
                <el-col :span="18">{{ item[labelField] }}</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="item.selected" :disabled="disabled"></el-checkbox>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { httpGet } from  '@/util/http'
    import { getField } from  '@/util/util'

    export default {
        props: {
            url: {
                default: ''
            },
            value: {
                default: ()=> []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            labelField: {
                type: String,
                default: 'label'
            },
            valueField: {
                type: String,
                default: 'value'
            },
            dataField: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入查询条件'
            }
        },
        data() {
            return {
                selectedAll: false,
                dataMap: {},
                dataList: [],
                condition: '',
            };
        },
        watch: {
            dataMap: {
                handler(newVal) {
                    // 获取选中的值
                    const result = [];
                    for (const key in newVal) {
                        const country = newVal[key];
                        if (country.selected) {
                            result.push(country[this.valueField]);
                        }
                    }
                    this.$emit('input', result);
                },
                deep: true
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init(params) {
                this.query(params);     
            },
            async query(params) {
                if(!this.url) return;
                var _self = this;
                if(this.url.then){
                    // 是promise对象
                    this.url.then(response => {
                        _self.queryHandler(getField(response, _self.dataField));
                    })
                }else if(typeof(this.url) === 'string'){
                    const { data } = await httpGet(_self.url, { params });
                    _self.queryHandler(data);
                }
            },
            queryHandler(data) {
                const map = {};
                data.forEach((item) => {
                    const key = item[this.valueField];
                    item.selected = (this.value.indexOf(key) > -1);
                    map[key] = item;
                });
                this.dataMap = map;
                this.dataList = data;
            },
            search() {
                const reg = /\s*,\s*/;
                const conditions = this.condition.split(reg);
                const arr = [];
                for (const key in this.dataMap) {
                    const item = this.dataMap[key];
                    if (!this.condition) {
                        arr.push(item);
                    } else {
                        for (let i = 0; i < conditions.length; i++) {
                            const value = conditions[i].toUpperCase();
                            if (value !=='' && item[this.labelField].toUpperCase().indexOf(value) > -1) {
                                arr.push(item);
                                break;
                            }
                        }
                    }
                }
                this.dataList = arr;
            },
            onAllSelectedChange() {
                this.dataList.forEach((item) => {
                    item.selected = this.selectedAll;
                });
            }
        }
    }

</script>
<style lang="less" scoped>
    .u-simple-select {
        width: 100%;
        max-width: 500px;
        .panel {
            max-height: 380px;
            border: 1px solid #bfcbd9;
            outline: 0;
            padding: 3px 10px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            border-radius: 3px;
            overflow-y: auto;
            margin-top: 20px;
        }
        .item{
            line-height: 36px;
            text-align: left;
            font-size: 14px;
        }
    }
</style>
