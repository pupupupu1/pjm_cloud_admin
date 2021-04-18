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
				label: 'roleName'
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
			console.log(this.tochild);
			var roleArray=nodes.map(node => node.id);
			let param = {
				userId: this.tochild.userInfo.id,
				roleIds: roleArray
			};
			pjmapi.pjmapi(param, 'pjm-service-user/userRole/assigningRoles', 'role').then(res => {
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
			pjmapi.pjmapi({}, 'pjm-service-user/role/list', 'user').then(res => {
				that.dataList = res.data.list;
				console.log(that.dataList);
				pjmapi.pjmapi4g('pjm-service-user/role/listByUserId/' + that.tochild.userInfo.id, 'user').then(res2 => {
					console.log(res2.data);
					that.checkMenuData = res2.data.map(item=>item.id);
				});
			});
		}
	},
	props: ['tochild']
};
</script>

<style></style>
