<template>
    <div id="app" class="app-container">
        <el-dialog width="800px" title="添加信息" :visible.sync="addDialogInfo.show"><addQuartz /></el-dialog>
        <el-dialog width="800px" title="查看信息" :visible.sync="detailDialogInfo.show"><detailQuartz /></el-dialog>
        <el-dialog width="800px" title="编辑信息" :visible.sync="editDialogInfo.show"><editQuartz /></el-dialog>
        <div>
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
                <el-table-column :show-overflow-tooltip="true" prop="jobName" label="job名称" min-width="10%" />
                <el-table-column :show-overflow-tooltip="true" prop="classPath" label="类名" min-width="15%" />
                <el-table-column :show-overflow-tooltip="true" prop="methodName" label="方法名" min-width="20%" />
                <el-table-column :show-overflow-tooltip="true" prop="params" label="参数" min-width="10%" />
                <el-table-column :show-overflow-tooltip="true" prop="cronExpression" label="执行规律" min-width="15%">
                    <!-- <template slot-scope="scope">

                    </template> -->
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="timeConsuming" label="耗时" min-width="10%">
                    <!-- <template slot-scope="scope">

                    </template> -->
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="lastExecutionTime" label="上次时间" min-width="15%">
                    <!-- <template slot-scope="scope">

                    </template> -->
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注" min-width="10%">
                    <!-- <template slot-scope="scope">

                    </template> -->
                </el-table-column>
                <el-table-column align="center" fixed="right" label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="details(scope.row)">查看</el-button>
                        <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteThis(scope.$index, tableData, scope.row)">删除</el-button>
                        <el-button v-show="scope.row.status == 0" size="mini" type="danger" @click="stopThis(scope.$index, tableData, scope.row)">暂停</el-button>
                        <el-button v-show="scope.row.status == 1" size="mini" type="success" @click="startThis(scope.$index, tableData, scope.row)">启用</el-button>
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
import quartzJs from './quartz.js';
import addQuartz from './componment/addQuartz.vue';
import detailQuartz from './componment/detailsQuartz.vue';
import editQuartz from './componment/editQuartz.vue';
export default {
    name: 'Member',
    components: {
        addQuartz,
        detailQuartz,
        editQuartz
    },
    mixins: [quartzJs]
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
