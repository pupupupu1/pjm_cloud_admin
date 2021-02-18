<template>
    <div id="app">
        <el-button @click="request">request</el-button>
        <el-button @click="getUserName">getusername</el-button>
        <el-button>12121</el-button>
        <Button>121212</Button>
        <div>{{ requestresult }}</div>
        <div>{{ UserName }}</div>
    </div>
</template>

<script>
import pjmapi from '../api/pjm_module.js';
export default {
    name: 'hello',
    data() {
        return {
            UserName: '',
            requestresult: ''
        };
    },
    created() {
        console.log(this.$router);
    },
    methods: {
        getUserName() {
            this.UserName = this.$store.getters.getUserName;
        },
        request() {
            var param = {
                id: '1'
            };
            pjmapi.pjmapi(param, 'member/details', 'hello').then(res => {
                console.log(res);
                this.requestresult = res.data.memberName;
            });
        }
    }
};
</script>

<style></style>
