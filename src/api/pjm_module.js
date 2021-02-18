import * as service from '../utils/service.js'
import request from '../utils/request.js'

export default {
    name: 'pjmapi',
    login(params, htmlname) {
        return service.callService('/user/login', params, htmlname)
    },
    pjmapi(param, url, htmlname) {
        let res = request({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'htmlname':htmlname
            },
            data: JSON.stringify(param),
        })
        return res
    },
    pjmapi4g(url, htmlname) {
        let res = request({
            url,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'htmlname':htmlname
            }
        })
        return res
    },
}
