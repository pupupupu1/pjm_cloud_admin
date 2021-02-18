module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/': {
                target: 'http://47.94.233.146:1220/', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/': '',
                },
            },
        },
    },
}
