<template>
  <div id="app">
    <el-form>
      <el-row>
        <el-form-item><wangEditor v-model="detail" :is-clear="isClear" @change="change" /></el-form-item>
      </el-row>
      <el-row style="left: 45%;">
        <el-form-item>
          <el-button type="primary" @click="getHtmlValue">添加</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import wangEditor from '../../../components/wangEditor.vue';
export default {
    name: 'AddMemberBak',
    components: {
        wangEditor: wangEditor
    },
    props: ['show'],
    data() {
        return {
            isClear: false,
            detail: '',
            htmlValue: ''
        };
    },
    created() {},
    methods: {
        getHtmlValue() {
            console.log(this.htmlValue)
            this.$store.commit("setItem",this.htmlValue)
            this.$parent.fetchData()
            this.back();
        },
        change(val) {
            this.htmlValue = val;
        },
        back() {
            this.show.List = true;
            this.show.detail = false;
            this.show.add = false;
        }
    }
};
</script>

<style scoped="scoped">

</style>
