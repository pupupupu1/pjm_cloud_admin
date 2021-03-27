<template>
    <div id="app">
        <div>
            <el-tabs stretch>
                <el-tab-pane label="信息填写">
                    <el-form v-loading="loading" :inline="true" ref="form" :model="form" label-width="120px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="任务名称" prop="operationMethod"><el-input placeholder="请输入任务名称" v-model="form.jobName"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="定时规则"><el-input placeholder="请输入定时规则" v-model="form.cronExpression"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="类名"><el-input placeholder="请输入类名" v-model="form.classPath"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="方法名"><el-input placeholder="请输入方法名" v-model="form.methodName"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="入参" prop="workingContent"><el-input placeholder="请输入入参" v-model="form.params"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="备注"><el-input placeholder="请输入备注" v-model="form.remark"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="left: 40%;">
                            <el-col>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                                    <el-button @click="quit">取消</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import pjmapi from '../../../api/pjm_module.js';
export default {
    created: function() {
        this.form.productid = this.productid;
    },
    components: {},
    data() {
        return {
            loading: false,
            form: {
                classPath: '',
                cronExpression: '',
                jobName: '',
                methodName: '',
                params: '',
                remark: ''
            },
            isclear: false
        };
    },
    methods: {
        ctop(str1, str2) {
            this.$emit(str1, str2);
            // alert("success");
        },
        onSubmit() {
            var that = this;
            this.$confirm('确定提交添加信息吗?', '提示', {
                confirmButtonText: '确定提交',
                cancelButtonText: '取消'
            })
                .then(() => {
                    //提交接口
                    this.loading = true;
                    pjmapi
                        .pjmapi(this.form, 'pjm-service-quartz/scheduleJob/insert', 'addQuartz')
                        .then(res => {
                            console.log(res);
                            this.$notify({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.loading = false;
                            this.$parent.$parent.fetchData();
                            this.$parent.$parent.addDialogInfo.show = false;
                        })
                        .catch(e => {
                            this.loading = false;
                        });
                })
                .catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        quit() {
            // this.ctop("refresh",false)
            this.$parent.$parent.addDialogInfo.show = false;
        }
    },
    props: []
};
</script>

<style></style>
