<template>
  <el-dialog :title="$attrs.title" :visible.sync="visible" width="75%">
    <simple-transfer 
        v-bind="$attrs"
        v-model="selectValue"
        style="height: 500px"
    ></simple-transfer>
    <div class="footer">
      <el-button type="primary" @click="onConfirm">确定</el-button>
      <el-button type="danger" @click="hide()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import SimpleTransfer from '../simple-transfer'

    export default {
        components: {
            SimpleTransfer
        },
        props: ['value'],
        data() {
            return { 
                visible: false,
                selectValue: []
            };
        },
        watch: {
            value(val) {
                this.selectValue = [...val]
            }
        },
        mounted() {
            this.selectValue = [...this.value]
        },
        methods: {
            onConfirm() {
                this.hide();
                this.$emit("confirm", this.selectValue);
            },
            show() {
                this.visible = true;
            },
            hide() {
                this.visible = false;
            }
        }
    };
</script>
<style lang="less" scoped>
.footer {
    margin-top: 25px;
    text-align: right;
}
</style>