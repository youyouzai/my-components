<template>
    <div  class="select-country-wrap mt20">
        <el-input v-model="condition" :rules="[]" placeholder="选择国家或输入国家关键词" @change="search"></el-input>
        <div class="country-panel">
            <el-row>
                <el-col :span="18">全部</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="selectedAll" :disabled="disabled" @change="onAllSelectedChange"></el-checkbox>
                </el-col>
            </el-row>
            <el-row v-for="(item, index) in dataList" :key="index">
                <el-col :span="18">{{ item[labelField] }}</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="item.selected" :disabled="disabled"></el-checkbox>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { getCountrys } from '@/common/baseApi';

    export default {
        props: {
            value: {
                type: Array,
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
            }
        },
        data() {
            return {
                field: 'countryName',
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
                            result.push(country.countryCode);
                        }
                    }
                    this.$emit('change', this.prop, result);
                },
                deep: true
            }
        },
        mounted() {
            this.query();
        },
        methods: {
            query() {
                getCountrys().then((res) => {
                    const map = {};
                    const selectedArr = this.selectedValue;
                    res.forEach((item) => {
                        item.selected = (selectedArr.indexOf(item.countryCode) > -1);
                        map[item[this.field]] = item;
                    });
                    this.dataMap = map;
                    this.dataList = res;
                });
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
                            if (item.countryName.toUpperCase().indexOf(value) > -1) {
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
    .select-country-wrap {
        max-width: 500px;
        .country-panel {
            height: 380px;
            border: 1px solid #bfcbd9;
            outline: 0;
            padding: 3px 10px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            border-radius: 3px;
            overflow-y: scroll;
            margin-top: 20px;
        }
    }
</style>
