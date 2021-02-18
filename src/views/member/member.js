import pjmapi from '../../api/pjm_module.js'

export default {
    data() {
        return {
            Loading: false,
            pdata: "Padta",
            total: 5,
            currentPage: 1,
            pageSize: 10,
            dialogFormVisible: false,
            detailsGrowthRecord: false,
            editGrowthRecord: false,
            tableData: [],
            multipleSelection: [],
            isFlush: false,
            show: {
                detail: false,
                List: true,
                add: false
            },
            searchmodel: {
                userName: '',
                userTel: '',
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        add() {
            this.show.List = false
            this.show.detail = false
            this.show.add = true
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
            pjmapi.pjmapi(this.searchmodel, 'pjm-service-user/user/list', 'member').then(res => {
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
            this.pdata = data
            this.show.add = false
            this.show.detail = true
            this.show.List = false
        },
        unEnableThis(index, rows, data) {

            this.$confirm('确定禁用它吗?' + data.id, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //data
               let params={
                   id:data.id,
                   enabled:0
               }
                pjmapi.pjmapi(params, 'pjm-service-user/user/edit', 'member').then(res => {
                    this.$notify({
                        message: res.msg
                    });
                    rows[index].enabled=0
                }).catch(error=>{
                    this.$notify({
                        message: error
                    });
                })
            })
        },
        enableThis(index, rows, data){
            //请求update
            let params={
                id:data.id,
                enabled:1
            }
             pjmapi.pjmapi(params, 'pjm-service-user/user/edit', 'member').then(res => {
                 this.$notify({
                     message: res.msg
                 });
                 rows[index].enabled=1
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
