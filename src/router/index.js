import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [{
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },

        component: () => import('../components/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('../components/404.vue'),
    },
    {
        path: '/',
        redirect: '/hello'
    },

]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    hello: {
        path: '/hello',
        text:'欢迎',
        name: 'hello',
        meta: {
            title: '欢迎elementui',
        },
        component: () => import('../views/hello.vue'),
    },
    system: {
        path: '/system',
        text:'系统',
        type: 'md-cog',
        name: 'system'
    },
    home: {
        path: '/home',
        text:'欢迎',
        name: 'home',
        type: 'md-home',
        meta: {
            title: '主页',
        },
        component: () => import('../views/Home.vue'),
    },
    member: {
        path: 'member',
        text:'成员',
        type: 'ios-body',
        name: 'member',
        meta: {
            title: '成员',
        },
        component: () => import('../views/member/member.vue'),
    },
    circle_of_friend: {
        path: 'circle_of_friend',
        name: 'circle_of_friend',
        text:'朋友圈',
        type: 'md-camera',
        meta: {
            title: '朋友圈',
        },
        component: () => import('../views/circle_of_friend/circle_of_friend.vue'),
    },
    quartz: {
        path: 'quartz',
        text:"定时器",
        type: 'md-timer',
        name: 'quartz',
        meta: {
            title: '定时器',
        },
        component: () => import('../views/quartz/quartz.vue'),
    },
    localMessage: {
        path: 'localMessage',
        name: 'localMessage',
        text:'消息日志',
        type: 'md-cog',
        meta: {
            title: '消息日志',
        },
        component: () => import('../views/localMessage/localMessage.vue'),
    },
    permission: {
        path: 'permission',
        name: 'permission',
        text:'权限控制',
        type: 'md-cog',
        meta: {
            title: '权限',
        },
        component: () => import('../views/permission/permission.vue'),
    },
    role: {
        path: 'role',
        name: 'role',
        text:'角色控制',
        type: 'md-cog',
        meta: {
            title: '角色',
        },
        component: () => import('../views/role/role.vue'),
    },
    friend: {
        path: 'friend',
        name: 'friend',
        text:'我的好友',
        type: 'md-cog',
        meta: {
            title: '我的好友',
        },
        component: () => import('../views/friend/friend.vue'),
    },
    group: {
        path: 'group',
        name: 'group',
        text:'群组控制',
        type: 'md-cog',
        meta: {
            title: '角色',
        },
        component: () => import('../views/group/group.vue'),
    },
    whiteList: {
        path: 'whiteList',
        name: 'whiteList',
        text:'接口白名单',
        type: 'md-cog',
        meta: {
            title: '白名单',
        },
        component: () => import('../views/whiteList/whiteList.vue'),
    }
}
store.commit("setRoutes",asyncRoutes)
const createRouter = () => new Router({
    routes: commonRoutes,
})
const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
