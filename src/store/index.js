import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [],
        userName: '',
        permissionList: [],
        roleList: [],
        routes: [],
        dict: [],
        userInfo: null,
        Item: ''
    },
    mutations: {
        setUserInfo(state, info) {
            state.userInfo = info
            sessionStorage.setItem("userInfo", JSON.stringify(info))
        },
        setRoutes(state, items) {
            state.routes = items
            sessionStorage.setItem("routes", JSON.stringify(items))
        },
        setMenus(state, items) {
            state.menuItems = items
            sessionStorage.getItem("menu", JSON.stringify(items))
        },
        setUserName(state, userName) {
            state.userName = userName
            sessionStorage.setItem("userName", userName)
        },
        setPermissionList(state, list) {
            state.permissionList = list
            sessionStorage.setItem("permissionList", JSON.stringify(list))
        },
        setRoleList(state, list) {
            state.roleList = list
            sessionStorage.setItem("roleList", JSON.stringify(list))
        },
        setDict(state, Dict) {
            state.dict = Dict
            sessionStorage.setItem("dict", JSON.stringify(Dict))
        },
        setItem(state, Item) {
            state.dict = Item
            sessionStorage.setItem("Item", JSON.stringify(Item))
        }
    },
    getters: {
        getUserInfo(state){
            if(state.userInfo==null){
                state.userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
            }
            return state.userInfo
        },
        getRoutes(state) {
            if (state.routes.length == 0) {
                state.routes = JSON.parse(sessionStorage.getItem("routes"))

            }
            return state.routes
        },
        getUserName(state) {
            if (!state.userName) {
                state.userName = sessionStorage.getItem("userName")
            }
            return state.userName
        },
        getPermissionList(state) {
            if (state.permissionList.length == 0) {
                state.permissionList = JSON.parse(sessionStorage.getItem("permissionList"))
            }
            return state.permissionList
        },
        getRoleList(state) {
            if (state.roleList.length == 0) {
                state.roleList = JSON.parse(sessionStorage.getItem("roleList"))
            }
            return state.roleList
        },
        getMenu(state) {
            if (!state.menuItems) {
                state.menuItems = JSON.parse(sessionStorage.getItem("menuItems"))
            }
            return state.menuItems
        },
        getDict(state) {
            if (!state.dict) {
                state.dict = JSON.parse(sessionStorage.getItem("dict"))
            }
            return state.dict
        },
        getItem(state) {
            if (!state.Item) {
                state.Item = JSON.parse(sessionStorage.getItem("Item"))
            }
            return state.Item
        }
    },
})

export default store
