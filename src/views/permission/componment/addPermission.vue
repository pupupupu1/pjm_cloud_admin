<template>
    <div id="app">
        <div>
            <el-tabs stretch>
                <el-tab-pane label="信息填写">
                    <el-form v-loading="loading" :inline="true" ref="form" :model="form" label-width="120px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="名称"><el-input placeholder="请输入名称" v-model="form.permissionName"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="编号"><el-input placeholder="请输入编号" v-model="form.permissionCode"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="类型"><el-input placeholder="请输入类型" v-model="form.permissionTypeCode"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="所属应用"><el-input placeholder="请输入所属应用" v-model="form.permissionApplicationCode"></el-input></el-form-item>
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
    created() {
        console.log(this.tochild);
        this.form.parentId = this.tochild.parentId;
    },
    mounted() {},
    components: {},
    data() {
        return {
            loading: false,
            form: {
                parentId: '',
                permissionApplicationCode: '',
                permissionCode: '',
                permissionName: '',
                permissionTypeCode: ''
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
                    console.log(this.form);
                    this.loading = true;
                    pjmapi
                        .pjmapi(this.form, 'pjm-service-user/permission/insert', 'permission')
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
    props: ['tochild']
};
</script>

<style></style>
