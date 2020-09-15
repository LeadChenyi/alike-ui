const path = require('path');

module.exports = {
    pages: {
        index: {// 构建应用入口
            entry: 'src/main.js',  
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    devServer: {
        proxy: {// API请求代理到API服务器
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                ws: true,
                changeOrigin: true
            }
        }
    },
    css: {
        loaderOptions: {// 向预处理器Loader传递选项，共享Sass/Less的全局变量
            scss: {
                additionalData: `@import '@/assets/css/variables.scss';`
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(path.resolve(__dirname,'packages')).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    }
}