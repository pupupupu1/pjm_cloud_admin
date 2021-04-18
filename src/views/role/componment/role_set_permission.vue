<template>
	<div>
		<el-tree ref="tree" show-checkbox node-key="id" :data="dataList" :props="defaultProps" :default-checked-keys="checkMenuData" @check-change="handleChange"></el-tree>
		<el-button @click="confirm">确定</el-button>
		<el-button @click="quit">取消</el-button>
	</div>
</template>

<script>
import pjmapi from '../../../api/pjm_module.js';
export default {
	name: '',
	created() {
		this.fetchData();
	},
	data() {
		return {
			dataList: [],
			defaultProps: {
				children: 'children',
				label: 'permissionName'
			},
			checkMenuData: []
		};
	},
	methods: {
		handleChange(data, checkbox, node) {
			// console.log(checkbox);
			// if (checkbox) {
			// 	this.$refs.tree.setCheckedKeys([data.id]);
			// } else {
			// }
		},
		confirm() {
			let nodes = this.$refs.tree.getCheckedNodes(false, true);
			console.log(nodes,this.checkMenuData);
			var permissionIds=nodes.map(node => node.id);
			let param = {
				roleId: this.tochild.roleInfo.id,
				permissionIds: permissionIds
			};
			pjmapi.pjmapi(param, 'pjm-service-user/rolePermission/assignPermissions', 'role').then(res => {
				this.$notify({
					message: 'success'
				});
				this.tochild.show = false;
			});
		},
		quit() {
			this.tochild.show = false;
		},
		fetchData() {
			var that = this;
			let para={
				pageNum:0,
				pageSize:0
			}
			pjmapi.pjmapi(para, 'pjm-service-user/permission/ListWithPageWithChildren', 'role').then(res => {
				that.dataList = res.data.list;
				console.log(that.dataList);
				pjmapi.pjmapi4g('pjm-service-user/permission/listByRoleId/' + that.tochild.roleInfo.id, 'role').then(res2 => {
					console.log(res2.data);
					that.checkMenuData = res2.data;
				});
			});
		}
	},
	props: ['tochild']
};
</script>

<style></style>
