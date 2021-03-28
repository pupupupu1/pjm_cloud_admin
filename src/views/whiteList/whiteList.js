import pjmapi from '../../api/pjm_module.js'

export default {
    data() {
        return {
            now:'',
            Loading: false,
            pdata: "Padta",
            addWilteLisData:{},
            total: 5,
            currentPage: 1,
            pageSize: 20,
            addDialogInfo: {
                show:false
            },
            detailDialogInfo: {
                show:false
            },
            editDialogInfo: {
                show:false
            },
            tableData: [],
            multipleSelection: [],
            isFlush: false,
            show: {
                detail: false,
                List: true,
                add: false
            },
            searchmodel: {
                roleName: '',
                pageNum: 1,
                pageSize: 20
            }
        }
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        add(type,pid) {
            this.addDialogInfo.show=true
            this.addWilteLisData.type=type
            this.addWilteLisData.parentId=pid
            this.now=new Date().getTime()
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(function(row) {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        callbackFunction(result) {
            // alert(result + "aaa");
        },
        fetchData() {
            var that = this
            that.searchmodel.pageNum = that.currentPage
            that.searchmodel.pageSize = that.pageSize
            that.Loading = true
            pjmapi.pjmapi(this.searchmodel, 'pjm-service-nacos/whiteListFilter/getTreeList', 'role').then(res => {
                that.tableData = res.data.list
                console.log(res.data);
                that.total = res.data.total;
                that.Loading = false
            }).catch(function() {
                that.Loading = false
            })

        },
        details(data) {
            console.log(data)
            this.detailDialogInfo.show=true
        },
        edit(data) {
            console.log(data)
            this.editDialogInfo.show=true
        },
        deleteThis(index, rows, data) {
            this.$confirm('确定删除它吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //data
               let params={
                   ids:[data.id]
               }
                pjmapi.pjmapi(params, 'pjm-service-nacos/whiteListFilter/delete', 'whiteList').then(res => {
                    this.$notify({
                        message: "已删除",
                        type:"success"
                    });
                    this.fetchData()
                }).catch(error=>{

                })
            })
        },
        startThis(index, rows, data){
            //请求update
            let params={
                ids:[data.id]
            }
             pjmapi.pjmapi(params, 'pjm-service-quartz/scheduleJob/resume', 'quartz').then(res => {
                 this.$notify({
                     message: res.msg
                 });
                 rows[index].status=0
             }).catch(error=>{
                 this.$notify({
                     message:error
                 });
             })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.fetchData(1, val);
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData(val, this.pageSize);
            // console.log(`当前页: ${val}`);
        },
        parentevent(data) {
            this.$data.isFlush = data;
            // alert("parentevent:" + this.isFlush);
        },
        closedetails(data) {
            this.detailsGrowthRecord = data;
        },
        searchdata() {
            var that = this;
            console.log(this.searchmodel);
            this.searchmodel.pageNum = this.currentPage;
            this.searchmodel.pageSize = this.pageSize;
            this.fetchData()
        },
        quit(data) {
            this.dialogFormVisible = data;
            this.editGrowthRecord = data;
        }
    },
    watch: {
        isFlush: function(newdata, olddata) {
            if (newdata == true) {
                this.fetchData();
                this.isFlush = false;
                this.dialogFormVisible = false;
                this.editGrowthRecord = false;
            }
        }
    }
}
