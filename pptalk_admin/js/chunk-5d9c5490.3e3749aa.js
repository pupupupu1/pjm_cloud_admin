(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d9c5490"],{"094b":function(e,t,n){"use strict";t["a"]={name:"tokenUtil",setToken:function(e){localStorage.setItem("Authorization",e)},getToken:function(){var e=localStorage.getItem("Authorization");return void 0==e||0==e.length?"":e},setUsername:function(e){localStorage.setItem("username",e)},getUsername:function(){var e=localStorage.getItem("username");return void 0==e||0==e.length?"":e}}},"548e":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container",attrs:{id:"app"}},[n("el-dialog",{attrs:{width:"800px",title:"添加信息",visible:e.addDialogInfo.show},on:{"update:visible":function(t){return e.$set(e.addDialogInfo,"show",t)}}},[n("addGroup")],1),n("el-dialog",{attrs:{width:"800px",title:"查看信息",visible:e.detailDialogInfo.show},on:{"update:visible":function(t){return e.$set(e.detailDialogInfo,"show",t)}}},[n("detailsGroup")],1),n("el-dialog",{attrs:{width:"800px",title:"编辑信息",visible:e.editDialogInfo.show},on:{"update:visible":function(t){return e.$set(e.editDialogInfo,"show",t)}}},[n("editGroup")],1),n("div",[n("el-row",{directives:[{name:"show",rawName:"v-show",value:e.show.List,expression:"show.List"}],attrs:{type:"flex",justify:"space-between"}},[n("el-col",{attrs:{span:21}},[n("el-form",{attrs:{inline:!0,size:"mini"}},[n("el-form-item",[n("el-input",{staticStyle:{width:"150px"},attrs:{size:"mini",clearable:"",placeholder:"姓名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchdata(t)}},model:{value:e.searchmodel.roleName,callback:function(t){e.$set(e.searchmodel,"roleName",t)},expression:"searchmodel.roleName"}})],1),n("el-form-item",[n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.searchdata}},[e._v("搜索")])],1)],1)],1),n("el-col",{attrs:{span:3}},[n("el-row",{attrs:{type:"flex",justify:"end"}},[n("el-form",{attrs:{inline:!0,size:"small"}},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.add}},[e._v("添加")])],1)],1)],1)],1),n("el-table",{directives:[{name:"show",rawName:"v-show",value:e.show.List,expression:"show.List"},{name:"loading",rawName:"v-loading.lock",value:e.Loading,expression:"Loading",modifiers:{lock:!0}}],ref:"multipleTable",attrs:{size:"mini","tree-props":{children:"children"},"row-key":"id","tooltip-effect":"dark",data:e.tableData,border:"",fit:"","highlight-current-row":"","header-cell-style":{background:"#42b983",color:"#ffffff"},height:580},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"60"}}),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"userGroupName",label:"群组名称","min-width":"10%"}}),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"userGroupNumber",label:"群组号码","min-width":"10%"}}),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"userGroupNumOfPeople",label:"群人数","min-width":"10%"}}),n("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(n){return e.details(t.row)}}},[e._v("查看")]),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.edit(t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.stopThis(t.$index,e.tableData,t.row)}}},[e._v("删除")])]}}])})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.show.List,expression:"show.List"}],staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-sizes":[20,40,70,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},o=[],i=(n("159b"),n("56b8")),r={data:function(){return{Loading:!1,pdata:"Padta",total:5,currentPage:1,pageSize:20,addDialogInfo:{show:!1},detailDialogInfo:{show:!1},editDialogInfo:{show:!1},tableData:[],multipleSelection:[],isFlush:!1,show:{detail:!1,List:!0,add:!1},searchmodel:{roleName:"",pageNum:1,pageSize:20}}},created:function(){this.fetchData()},methods:{add:function(){this.addDialogInfo.show=!0},toggleSelection:function(e){e?e.forEach((function(e){this.$refs.multipleTable.toggleRowSelection(e)})):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},callbackFunction:function(e){},fetchData:function(){var e=this;e.searchmodel.pageNum=e.currentPage,e.searchmodel.pageSize=e.pageSize,e.Loading=!0,i["a"].pjmapi(this.searchmodel,"pjm-service-user/userGroupInfo/listGroup","role").then((function(t){e.tableData=t.data.list,console.log(t.data),e.total=t.data.total,e.Loading=!1})).catch((function(){e.Loading=!1}))},details:function(e){console.log(e),this.detailDialogInfo.show=!0},edit:function(e){console.log(e),this.editDialogInfo.show=!0},stopThis:function(e,t,n){var a=this;this.$confirm("确定停止它吗?"+n.id,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var o={ids:[n.id]};i["a"].pjmapi(o,"pjm-service-quartz/scheduleJob/pause","quartz").then((function(n){a.$notify({message:n.msg}),t[e].status=1})).catch((function(e){a.$notify({message:e})}))}))},startThis:function(e,t,n){var a=this,o={ids:[n.id]};i["a"].pjmapi(o,"pjm-service-quartz/scheduleJob/resume","quartz").then((function(n){a.$notify({message:n.msg}),t[e].status=0})).catch((function(e){a.$notify({message:e})}))},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.fetchData(1,e)},handleCurrentChange:function(e){this.currentPage=e,this.fetchData(e,this.pageSize)},parentevent:function(e){this.$data.isFlush=e},closedetails:function(e){this.detailsGrowthRecord=e},searchdata:function(){console.log(this.searchmodel),this.searchmodel.pageNum=this.currentPage,this.searchmodel.pageSize=this.pageSize,this.fetchData()},quit:function(e){this.dialogFormVisible=e,this.editGrowthRecord=e}},watch:{isFlush:function(e,t){1==e&&(this.fetchData(),this.isFlush=!1,this.dialogFormVisible=!1,this.editGrowthRecord=!1)}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" add ")])},l=[],c={},u=c,d=n("2877"),h=Object(d["a"])(u,s,l,!1,null,null,null),p=h.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" detail ")])},g=[],f={},v=f,w=Object(d["a"])(v,m,g,!1,null,null,null),b=w.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" edit ")])},j=[],z={},k=z,S=Object(d["a"])(k,y,j,!1,null,null,null),x=S.exports,D={name:"permission",components:{addGroup:p,detailsGroup:b,editGroup:x},mixins:[r]},T=D,_=(n("6848"),Object(d["a"])(T,a,o,!1,null,null,null));t["default"]=_.exports},"56b8":function(e,t,n){"use strict";n("d3b7");var a=n("bc3a"),o=n.n(a),i=n("5c96"),r=n("094b");function s(e,t,n){var a="http://47.94.233.146:1220/";if(r["a"].getToken()||r["a"].getUsername()||"pjm-service-user/user/login"==e){var s=JSON.stringify(t),l={url:a+e,method:"post",headers:{"Content-Type":"application/json",Authorization:r["a"].getToken(),username:r["a"].getUsername(),htmlname:n},data:s};return o()(l).then((function(e){console.log(e);var t=e.data;return console.log("service.js"),!t||0!==t.code&&"0"!==t.code?(Object(i["Message"])({message:e.msg,type:"error",duration:5e3}),Promise.reject(e.msg)):t})).catch((function(e){if(console.log(e),e){var t=e;return e.data||Object(i["Message"])({message:t,type:"error",duration:3e3}),Promise.reject(t)}return Object(i["Message"])({message:"服务有问题, 请联系管理员~",type:"error",duration:5e3}),Promise.reject("服务有问题, 请联系管理员~")}))}return Object(i["Message"])({message:"登录过期了",type:"error",duration:5e3}),Promise.reject("登录过期了")}var l=n("4360"),c=o.a.create({baseURL:"http://47.94.233.146:1220/",timeout:5e4});c.interceptors.request.use((function(e){return r["a"].getToken()&&(e.headers["Authorization"]=r["a"].getToken(),e.headers["username"]=r["a"].getUsername()),e}),(function(e){return console.log(e),Promise.reject(e)})),c.interceptors.response.use((function(e){var t=e.data;return"0"==t.code||200==t.code?(console.log("requesetsuccess-----",t),t):("403"===t.code?i["MessageBox"].confirm("你的登陆已经过期，请重新登陆！","重新登陆",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){l["a"].dispatch("login").then((function(){location.reload()}))})):Object(i["Message"])({message:t.msg||"Error",type:"error",duration:5e3}),console.log("requeset-----",t),Promise.reject(new Error(t.msg||"Error")))}),(function(e){return console.log("err"+e),Object(i["Message"])({message:e.msg||"Error",type:"error",duration:5e3}),Promise.reject(e)}));var u=c;t["a"]={name:"pjmapi",login:function(e,t){return s("/user/login",e,t)},pjmapi:function(e,t,n){var a=u({url:t,method:"post",headers:{"Content-Type":"application/json",htmlname:n},data:JSON.stringify(e)});return a},pjmapi4g:function(e,t){var n=u({url:e,method:"get",headers:{"Content-Type":"application/json",htmlname:t}});return n}}},"5e0a":function(e,t,n){},6848:function(e,t,n){"use strict";var a=n("5e0a"),o=n.n(a);o.a}}]);
//# sourceMappingURL=chunk-5d9c5490.3e3749aa.js.map