<template>
  <div id="app">
    <el-card class="demand-new-form-container1">
      <el-form label-width="70px">
        <el-row v-model="user">
          <el-form-item label="账号:"><el-input v-model="user.userAccount" /></el-form-item>
          <el-form-item label="密码:"><el-input v-model="user.userPassword" /></el-form-item>
          <el-form-item label="姓名:"><el-input v-model="user.userName" /></el-form-item>
          <el-form-item label="电话:"><el-input v-model="user.userTel" /></el-form-item>
        </el-row>
        <el-row style="left: 35%;">
          <el-form-item>
            <el-button type="primary" @click="addMember">添加</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../../../api/pjm_module.js';
export default {
    name: 'AddMember',
    components: {},
    props: ['show'],
    data() {
        return {
            isClear: false,
            user: {
                userAccount: '',
                userName: '',
                userPassword: '',
                userTel: ''
            }
        };
    },
    created() {},
    methods: {
        addMember() {
            console.log(this.user);
            api.pjmapi(this.user, 'pjm-service-user/user/insert', 'addmember').then(res => {
                if (res.code == 200 || res.code == 0) {
                    this.$notify({
                        message: '添加成功'
                    });
                    this.back();
                } else {
                    this.$notify({
                        message: res.msg
                    });
                }
            });
        },
        back() {
            this.show.List = true;
            this.show.detail = false;
            this.show.add = false;
        }
    }
};
</script>

<style>
.demand-new-form-container1 {
    width: 40%;
    /*position: absolute;*/
    left: 0;
    right: 0;
    /* padding: 35px 35px 15px;*/
    margin: 20px auto;
}
</style>
