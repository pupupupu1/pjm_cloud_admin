export default {
    name: 'tokenUtil',
    setToken(token) {
        localStorage.setItem("Authorization", token)
    },
    getToken() {
        var token = localStorage.getItem("Authorization")
        if (token == undefined || token.length == 0) {
            return ''
        }
        return token
    },
    setUsername(username) {
        localStorage.setItem("username", username)
    },
    getUsername() {
        var username = localStorage.getItem("username")
        if (username == undefined || username.length == 0) {
            return ''
        }
        return username
    }

}
