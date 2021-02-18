<template>
  <div id="app" class="app-container">
    <div>
      <addMember v-show="show.add" :show="show" />
      <detailsMember v-show="show.detail" :data="pdata" :show="show" />
      <el-row v-show="show.List" type="flex" justify="space-between">
        <el-col :span="21">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="searchmodel.userName" style="width: 150px;" size="mini" clearable placeholder="姓名" @keyup.enter.native="searchdata" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchmodel.userTel" style="width: 150px;" size="mini" clearable placeholder="电话" @keyup.enter.native="searchdata" />
            </el-form-item>
            <el-form-item><el-button size="mini" type="primary" icon="el-icon-search" @click="searchdata">搜索</el-button></el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <el-row type="flex" justify="end">
            <el-form :inline="true" size="small">
              <el-button size="mini" type="primary" @click="add">添加</el-button>
            </el-form>
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
        <el-table-column :show-overflow-tooltip="true" prop="userAccount" label="账户" min-width="20%" />
        <el-table-column :show-overflow-tooltip="true" prop="userName" label="姓名" min-width="20%" />
        <el-table-column :show-overflow-tooltip="true" prop="userTel" label="电话" min-width="20%" />
        <el-table-column :show-overflow-tooltip="true" prop="userAddress" label="地址" min-width="20%" />
        <el-table-column :show-overflow-tooltip="true" label="头像" width="200">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://39.105.78.171:1250'+scope.row.userHeader"
              :preview-src-list="['http://39.105.78.171:1250'+scope.row.userHeader]"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="success" @click="details(scope.row)">查看</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button> -->
            <el-button v-show="scope.row.enabled==1" size="mini" type="danger" @click="unEnableThis(scope.$index, tableData, scope.row)">禁用</el-button>
            <el-button v-show="scope.row.enabled==0" size="mini" type="success" @click="enableThis(scope.$index, tableData, scope.row)">启用</el-button>
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
import memberJs from './member.js';
import addMember from './componment/addMember.vue';
import detailsMember from './componment/detailMember.vue';
export default {
    name: 'Member',
    components: {
        addMember: addMember,
        detailsMember: detailsMember
    },
    mixins: [memberJs]
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
