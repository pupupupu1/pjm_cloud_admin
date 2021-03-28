import axios from 'axios'
import {
    Message,
    MessageBox
} from 'element-ui'
import store from '@/store'
import tokenUtil from './tokenUtils.js'
import {
    resetTokenAndClearUser
} from './index.js'

// create an axios instance
const service = axios.create({
    baseURL: 'http://47.94.233.146:1220/', // url = base url + request url
    // baseURL: '',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (tokenUtil.getToken()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = tokenUtil.getToken()
            config.headers['username'] = tokenUtil.getUsername()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {

        const res = response.data
        const header = response.headers
        if (res.code == '0' || res.code == 200) {
            console.log('requesetsuccess-----', res)
            console.log("there is header",header)
            console.log(header.authorization != undefined)
            if (header.authorization != undefined) {
                console.log("response中返回了新的token")
                tokenUtil.setToken(header.authorization)
            }
            return res
        } else {
            if (res.code == '403' || res.code == '401') {
                // to re-login
                MessageBox.confirm('你的登陆已经过期，请重新登陆！', '重新登陆', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    resetTokenAndClearUser()
                    location.reload()
                })
            } else {
                // 其它错误弹出错误信息
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            console.log('requeset-----', res)
            return Promise.reject(new Error(res.msg || 'Error'))
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
