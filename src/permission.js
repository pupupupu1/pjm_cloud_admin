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
                var data = []
                // [{
                //         name: 'hello', // 要跳转的路由名称 不是路径
                //         hidden: true,
                //     },
                //     {
                //         name: 'member', // 要跳转的路由名称 不是路径
                //         hidden: true,
                //     },
                //     {
                //         name: 'quartz', // 要跳转的路由名称 不是路径
                //         hidden: true,
                //     },
                //     {
                //         name: 'localMessage', // 要跳转的路由名称 不是路径

                //         hidden: true,
                //     },
                //     {
                //         name: 'circle_of_friend', // 要跳转的路由名称 不是路径
                //         size: 18, // icon大小
                //         type: 'md-camera', // icon类型
                //         text: '朋友圈', // 文本内容
                //         // hidden: true,
                //     },
                // ]
                console.log("获取权限列表加载成为菜单")
                let permissionList = store.getters.getPermissionList
                console.log(permissionList)
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
                                if(!allRoutes[itemChild.permissionCode]){
                                    return;
                                }
                                let s = JSON.parse(JSON.stringify(allRoutes[itemChild.permissionCode]))
                                s.hidden = false
                                f.children.push(s)
                            })
                        }else{
                           f.children=null
                        }

                        asyncMenu.push(f)
                    }
                })

                console.log(asyncMenu)

                // [{
                //     name: 'system', // 要跳转的路由名称 不是路径
                //     size: 18, // icon大小
                //     type: 'md-cog', // icon类型
                //     text: '系统', // 文本内容
                //     children: [{
                //             name: 'hello', // 要跳转的路由名称 不是路径
                //             size: 18, // icon大小
                //             type: 'md-home', // icon类型
                //             text: '欢迎', // 文本内容
                //             // hidden: true,
                //         }, {
                //             name: 'member', // 要跳转的路由名称 不是路径
                //             size: 18, // icon大小
                //             type: 'ios-body', // icon类型
                //             text: '成员', // 文本内容
                //             // hidden: true,
                //         }, {
                //             name: 'quartz', // 要跳转的路由名称 不是路径
                //             size: 18, // icon大小
                //             type: 'md-timer', // icon类型
                //             text: '定时器', // 文本内容
                //             // hidden: true,
                //         },
                //         {
                //             name: 'localMessage', // 要跳转的路由名称 不是路径
                //             size: 18, // icon大小
                //             type: 'md-cog', // icon类型
                //             text: '消息日志', // 文本内容
                //             // hidden: true,
                //         }
                //     ]
                // }]
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
