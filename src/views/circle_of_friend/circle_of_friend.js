import pjmapi from '../../api/pjm_module.js'

export default {
    data() {
        return {
            Loading: false,
            pdata: "Padta",
            total: 5,
            currentPage: 1,
            pageSize: 20,
            addDialogInfo: {
                show:false,
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
                textContent: '',
                pageNum: 1,
                pageSize: 20
            }
        }
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        add() {
            this.addDialogInfo.show=true
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
            that.searchmodel.userAccount=this.$store.getters.getUserInfo.userAccount
            that.Loading = true
            pjmapi.pjmapi(this.searchmodel, 'pjm-service-circleoffriend/circleOfFriendsInfo/getList', 'member').then(res => {
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
        deletethis(index, rows, data) {
            this.$confirm('确定删除它吗?', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                pjmapi.pjmapi4g("/pjm-service-circleoffriend/circleOfFriendsInfo/delete/"+data.id,'circle').then(res=>{
                    this.$notify({
                        message:res.msg
                    })
                    this.tableData.splice(index,1);
                })
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
