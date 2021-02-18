<template>
    <div id="app">
        <p v-html="htmlValue"></p>
        <el-button @click="back">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'detailsMember',
    created() {
        // alert(this.$store.getters.getItem);
        // this.htmlValue= sessionStorage.getItem('htmlvalue')
    },
    mounted() {
        this.htmlValue = sessionStorage.getItem("Item");
    },
    data() {
        return {
            htmlValue: sessionStorage.getItem("Item")
        };
    },
    methods: {
        back() {
            this.show.List = true;
            this.show.detail = false;
            this.show.add = false;
        }
    },
    watch: {
        'data.id': {
            handler(newVal, oldVal) {
                this.htmlValue = sessionStorage.getItem("Item");
            },
            deep: true
        }
    },
    props: ['show', 'data']
};
</script>

<style></style>
