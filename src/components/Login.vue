<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input v-model="account" prefix="ios-contact" placeholder="用户名" clearable @on-blur="verifyAccount" />
                <p class="error">{{ accountError }}</p>
            </div>
            <div class="input-c">
                <Input v-model="pwd" type="password" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd" />
                <p class="error">{{ pwdError }}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <p class="account">
                <span @click="register">注册账号</span>
                |
                <span @click="forgetPwd">忘记密码</span>
            </p>
        </div>
    </div>
</template>

<script>
import tokenUtil from '../utils/tokenUtils.js';
import pjmapi from '../api/pjm_module.js';
import createRoutes from '@/utils/createRoutes';
import router from '../router/index.js';
export default {
    name: 'Login',
    data() {
        return {
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {}
        };
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')';
    },
    methods: {
        verifyAccount() {
            if (this.account == '') {
                this.accountError = '请输入账号';
            } else {
                this.accountError = '';
            }
        },
        verifyPwd() {
            if (this.pwd == '') {
                this.pwdError = '请输入密码';
            } else {
                this.pwdError = '';
            }
        },
        register() {},
        forgetPwd() {},
        submit() {
            // alert("success")
            var param = {
                userAccount: this.account,
                userPassword: this.pwd
            };
            pjmapi.pjmapi(param, 'pjm-service-user/user/login', 'login').then(res => {
                if (res.code == '200') {
                    this.isShowLoading = true;
                    // 登陆成功 设置用户信息
                    localStorage.setItem('userImg', 'http://39.105.78.171:1250' + res.data.userHeader);
                    localStorage.setItem('userName', res.data.userName);
                    localStorage.setItem('Authorization', res.data.token);
                    // 登陆成功 假设这里是后台返回的 token
                    tokenUtil.setToken(res.msg);
                    tokenUtil.setUsername(res.data.userAccount);
                    pjmapi.pjmapi({}, 'pjm-service-user/user/init', 'login').then(info => {
                        
                        this.$store.commit('setUserName', info.data.userName);
                        this.$store.commit("setPermissionList",info.data.permissionList)
                        this.$store.commit("setRoleList",info.data.roleList)
                        this.$store.commit("setUserInfo",info.data)
                        console.log('准备进入主页');
                        this.$router.push({ path: '/' });
                    });
                } else {
                    this.$notify({
                        message: res.msg
                    });
                    return;
                }
            });
        }
    }
};
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, 0.5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>
