<template>
  <div id="app" class="app-container">
    <el-dialog width="800px" title="添加信息" :visible.sync="addDialogInfo.show">
      <addCircle />
    </el-dialog>
    <el-dialog width="800px" title="查看信息" :visible.sync="detailDialogInfo.show">
      <detailsCircle />
    </el-dialog>
    <el-dialog width="800px" title="编辑信息" :visible.sync="editDialogInfo.show">
      <editCircle />
    </el-dialog>
    <div>
      <el-row v-show="show.List" type="flex" justify="space-between">
        <el-col :span="21">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="searchmodel.textContent" style="width: 150px;" size="mini" clearable placeholder="朋友圈内容" @keyup.enter.native="searchdata" />
            </el-form-item>
            <el-form-item><el-button size="mini" type="primary" icon="el-icon-search" @click="searchdata">搜索</el-button></el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <el-row type="flex" justify="end">
            <el-form :inline="true" size="small"><el-button size="mini" type="primary" @click="add">添加</el-button></el-form>
          </el-row>
        </el-col>
      </el-row>
      <el-table
        v-show="show.List"
        ref="multipleTable"
        v-loading.lock="Loading"
        size="mini"
        tooltip-effect="dark"
        :data="tableData"
        border
        fit
        highlight-current-row
        :header-cell-style="{ background: '#42b983', color: '#ffffff' }"
        :height="580"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" />
        <!-- <el-table-column prop="id" label="id" width="180" sortable></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" prop="textContent" label="内容" width="150" />
        <el-table-column :show-overflow-tooltip="true" prop="userAccount" label="发布人" width="120" />
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="发布时间" width="350" />
        <el-table-column :show-overflow-tooltip="true" prop="likesNum" label="点赞数" width="200" />
        <el-table-column :show-overflow-tooltip="true" prop="picPath" label="图片地址" width="200" />
        <el-table-column align="center" fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="details(scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletethis(scope.$index, tableData, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="show.List" class="pagination-container">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[20, 40, 70, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import circle_of_friendJs from './circle_of_friend.js';
import addCircle from './componment/addCircle.vue';
import detailsCircle from './componment/detailsCircle.vue';
import editCircle from './componment/editCircle.vue';
export default {
    name: 'CircleOfFriend',
    components: {
        addCircle,
        detailsCircle,
        editCircle
    },
    mixins: [circle_of_friendJs]
};
</script>

<style>
/* .el-table th td {
    text-align: center;
}

.el-table tbody tr td:first-child {
    text-align: center;
} */
</style>
