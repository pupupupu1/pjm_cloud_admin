<template>
    <div id="app" class="app-container">

        <el-dialog width="800px" title="查看信息" :visible.sync="detailDialogInfo.show"><detailsFriend /></el-dialog>

        <div>
            <el-row v-show="show.List" type="flex" justify="space-between">
                <el-col :span="21">
                    <el-form :inline="true" size="mini">
                        <el-form-item>
                            <el-input v-model="searchmodel.roleName" style="width: 150px;" size="mini" clearable placeholder="姓名" @keyup.enter.native="searchdata" />
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
                :tree-props="{children: 'children'}"
                row-key="id"
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
                <el-table-column :show-overflow-tooltip="true" prop="user.userName" label="好友姓名" min-width="20%" />
                <el-table-column :show-overflow-tooltip="true" prop="user.userAccount" label="好友账号" min-width="20%" />
                <el-table-column :show-overflow-tooltip="true" prop="user.userTel" label="好友电话" min-width="20%" />

                <el-table-column align="center" fixed="right" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="details(scope.row)">查看</el-button>
                        <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="stopThis(scope.$index, tableData, scope.row)">删除</el-button>

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
import friendJs from './friend.js';
import detailsFriend from './componment/detailsFriend.vue';

export default {
    name: 'permission',
    components: {
        detailsFriend
    },
    mixins: [friendJs]
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
