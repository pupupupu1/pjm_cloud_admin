import axios from 'axios'
import {
    Message
} from 'element-ui'
import tokenUtil from './tokenUtils.js'

export function callService(url, params, htmlname) {
    let baseUrl = 'http://47.94.233.146:1220/'
    // let baseUrl = ''
    if (tokenUtil.getToken() || tokenUtil.getUsername() || url == "pjm-service-user/user/login") {
        const data = JSON.stringify(params)
        const config = {
            url: baseUrl + url,
            // timeout: 5000,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenUtil.getToken(),
                'username': tokenUtil.getUsername(),
                'htmlname': htmlname
            },
            data
        }
        return axios(config).then(response => {
            console.log(response)
            const res = response.data
            console.log("service.js")
            if (res && (res.code === 0 || res.code === '0')) {
                // alert("codesuccess")
                return res
            } else {
                // if (res.data) {
                //     // alert("datasuccess")
                //     return Promise.reject(res)
                // } else {
                //     // console.log((res && res.msg) ? res.msg : '')
                //     return Promise.reject((res && res.msg) ? res.msg : '')
                // }
                Message({
                    message: response.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(response.msg)
            }
        }).catch(function(error) {
            console.log(error)
            if (error) {
                const _error = error
                if (!error.data) {
                    Message({
                        message: _error,
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
                return Promise.reject(_error)
            } else {
                Message({
                    message: '服务有问题, 请联系管理员~',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject('服务有问题, 请联系管理员~')
            }
        })
    } else {
        Message({
            message: '登录过期了',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject('登录过期了')
    }
}
