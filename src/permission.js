import {
    LoadingBar
} from 'view-design'
import router from './router'
import store from './store'
import createRoutes from '@/utils/createRoutes'
import {
    getDocumentTitle,
    resetTokenAndClearUser
} from './utils'
import tokenUtil from './utils/tokenUtils.js'
import pjmapi from './api/pjm_module.js'
// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    document.title = getDocumentTitle(to.meta.title)
    LoadingBar.start()
    if (localStorage.getItem('Authorization')) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else if (hasMenus) {
            next()
        } else {
            try {
                // 这里可以用 await 配合请求后台数据来生成路由
                // const data = await axios.get('xxx')
                // const routes = createRoutes(data)
                console.log("加载菜单")
                var data = []
                console.log("获取权限列表加载成为菜单")
                var permissionList = store.getters.getPermissionList
                console.log(permissionList)
                if (permissionList == null) {
                    console.log("初始化用户信息，获取菜单权限列表")
                    pjmapi.pjmapi({}, 'pjm-service-user/user/init', 'permissionJs').then(info => {
                        store.commit('setUserName', info.data.userName);
                        store.commit("setPermissionList", info.data.permissionList)
                        store.commit("setRoleList", info.data.roleList)
                        store.commit("setUserInfo", info.data)
                        permissionList = store.getters.getPermissionList
                        let menuList = permissionList.filter(item => item.permissionTypeCode != 0)
                        console.log(menuList)
                        let allRoutes = store.getters.getRoutes
                        console.log(allRoutes)
                        for (let key in allRoutes) {
                            console.log(key)
                            let param = allRoutes[key]
                            param.size = 18
                            param.hidden = true
                            data.push(param)
                        }
                        let asyncMenu = []
                        
                        menuList.forEach(item => {
                            console.log(allRoutes[item.permissionCode])
                            if (allRoutes[item.permissionCode]) {
                                let f = JSON.parse(JSON.stringify(allRoutes[item.permissionCode]))
                                f.hidden = false
                                f.children = []
                                if (item.children != null) {
                                    item.children.forEach(itemChild => {
                                        if (!allRoutes[itemChild.permissionCode]) {
                                            return;
                                        }
                                        let s = JSON.parse(JSON.stringify(allRoutes[itemChild.permissionCode]))
                                        s.hidden = false
                                        f.children.push(s)
                                    })
                                } else {
                                    f.children = null
                                }
                        
                                asyncMenu.push(f)
                            }
                        })
                        
                        console.log(asyncMenu)
                        data = data.concat(asyncMenu)
                        store.commit('setMenus', data)
                        console.log(data)
                        const routes = createRoutes(data)
                        // const routes = createRoutes(store.state.menuItems)
                        // 动态添加路由
                        console.log(routes)
                        router.addRoutes(routes)
                        hasMenus = true
                        console.log("菜单加载完毕")
                        next({
                            path: to.path || '/'
                        })
                    });
                }else{
                    let menuList = permissionList.filter(item => item.permissionTypeCode != 0)
                    console.log(menuList)
                    let allRoutes = store.getters.getRoutes
                    console.log(allRoutes)
                    for (let key in allRoutes) {
                        console.log(key)
                        let param = allRoutes[key]
                        param.size = 18
                        param.hidden = true
                        data.push(param)
                    }
                    let asyncMenu = []
                    
                    menuList.forEach(item => {
                        console.log(allRoutes[item.permissionCode])
                        if (allRoutes[item.permissionCode]) {
                            let f = JSON.parse(JSON.stringify(allRoutes[item.permissionCode]))
                            f.hidden = false
                            f.children = []
                            if (item.children != null) {
                                item.children.forEach(itemChild => {
                                    if (!allRoutes[itemChild.permissionCode]) {
                                        return;
                                    }
                                    let s = JSON.parse(JSON.stringify(allRoutes[itemChild.permissionCode]))
                                    s.hidden = false
                                    f.children.push(s)
                                })
                            } else {
                                f.children = null
                            }
                    
                            asyncMenu.push(f)
                        }
                    })
                    
                    console.log(asyncMenu)
                    data = data.concat(asyncMenu)
                    store.commit('setMenus', data)
                    console.log(data)
                    const routes = createRoutes(data)
                    // const routes = createRoutes(store.state.menuItems)
                    // 动态添加路由
                    console.log(routes)
                    router.addRoutes(routes)
                    hasMenus = true
                    console.log("菜单加载完毕")
                    next({
                        path: to.path || '/'
                    })
                }
                
            } catch (error) {
                console.error(error)
                resetTokenAndClearUser()
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    LoadingBar.finish()
})
